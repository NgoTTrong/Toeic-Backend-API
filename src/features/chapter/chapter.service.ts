import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Answer, Attachment, Chapter, ChapterQuestion } from '@prisma/client';
import { AddQuestionDto } from './dto/add-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class ChapterService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createChapterDto: CreateChapterDto) {
    return 'This action adds a new chapter';
  }

  findAll() {
    return `This action returns all chapter`;
  }

  findOne(id: string) {
    return this.prismaService.chapter.findFirst({
      where: { id },
      include: {
        topic: true,
        ChapterQuestion: {
          include: {
            question: true,
          },
          orderBy: {
            position: 'asc',
          },
        },
      },
    });
  }
  async getDetailChapter(chapterId: string, courseId: string, userId: string) {
    const payment = await this.prismaService.payment.findFirst({
      where: {
        courseId,
        userId,
      },
    });
    const course = await this.prismaService.course.findFirst({
      where: { id: courseId, isPublished: true },
    });
    const chapter = await this.prismaService.chapter.findFirst({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });
    if (!chapter || !course) {
      throw new BadRequestException('Chapter or course not found.');
    }
    let attachments: Attachment[] = [];
    let questions: ChapterQuestion[] = [];
    let nextChapter: Chapter | null = null;

    if (chapter?.isFree || payment) {
      nextChapter = await this.prismaService.chapter.findFirst({
        where: {
          courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: 'asc',
        },
      });
      attachments = await this.prismaService.attachment.findMany({
        where: {
          courseId,
        },
      });
      questions = await this.prismaService.chapterQuestion.findMany({
        where: {
          chapterId,
        },
        include: {
          question: true,
        },
        orderBy: {
          position: 'asc',
        },
      });
    }
    const userProgress = await this.prismaService.userProgress.findFirst({
      where: {
        userId,
        chapterId,
      },
    });
    return {
      chapter,
      payment,
      nextChapter,
      course,
      attachments,
      userProgress,
      questions,
    };
  }

  async update(id: string, updateChapterDto: UpdateChapterDto) {
    const { courseId, ...updateData } = updateChapterDto;
    if (courseId) {
      const publishedChapter = await this.prismaService.chapter.findMany({
        where: {
          courseId,
          isPublished: true,
        },
      });
      if (publishedChapter.length == 0) {
        await this.prismaService.course.update({
          where: {
            id: courseId,
          },
          data: {
            isPublished: false,
          },
        });
      }
    }

    return this.prismaService.chapter.update({
      where: {
        id,
      },
      data: updateData,
    });
  }

  async remove(id: string, courseId: string) {
    const deletedChapter = await this.prismaService.chapter.findFirst({
      where: {
        id: id,
      },
    });
    if (!deletedChapter) {
      throw new BadGatewayException('Chapter is not found');
    }
    const publishChapters = await this.prismaService.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
    });
    if (publishChapters.length == 0) {
      await this.prismaService.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }
    await this.prismaService.chapterQuestion.deleteMany({
      where: {
        chapterId: id,
      },
    });
    return this.prismaService.chapter.delete({ where: { id } });
  }

  async addQuestion(chapterId: string, dto: AddQuestionDto) {
    const createdQuestion = await this.prismaService.question.create({
      data: {
        ...dto?.question,
      },
    });
    const chapters = await this.prismaService.chapterQuestion.findMany({
      where: {
        chapterId,
      },
    });
    return await this.prismaService.chapterQuestion.create({
      data: {
        chapterId,
        questionId: createdQuestion?.id,
        audioUrl: dto?.audioUrl,
        imageUrl: dto?.imageUrl,
        position: chapters?.length,
      },
    });
  }

  deleteQuestion(questionId: string) {
    return this.prismaService.chapterQuestion.delete({
      where: { id: questionId },
    });
  }
  async updateQuestion(questionId: string, dto: UpdateQuestionDto) {
    const _question = await this.prismaService.chapterQuestion.update({
      where: {
        id: questionId,
      },
      data: {
        audioUrl: dto?.audioUrl,
        imageUrl: dto?.imageUrl,
      },
    });
    await this.prismaService.question.update({
      where: {
        id: dto?.question?.id,
      },
      data: {
        optionA: dto?.question?.optionA,
        content: dto?.question?.content,
        optionB: dto?.question?.optionB,
        optionC: dto?.question?.optionC,
        optionD: dto?.question?.optionD,
        topicId: dto?.question?.topicId,
        explain: dto?.question?.explain,
        answer: dto?.question?.answer,
      },
    });
    return _question;
  }

  async reorderQuestions(
    chapterId: string,
    updateData: { id: string; position: number }[],
  ) {
    const _chapter = await this.prismaService.chapter.findFirst({
      where: { id: chapterId },
    });
    if (!_chapter) {
      throw new BadRequestException('Chapter is not found!');
    }

    return await Promise.all(
      updateData.map((question) =>
        this.prismaService.chapterQuestion.update({
          where: {
            chapterId: _chapter?.id,
            id: question?.id,
          },
          data: {
            position: question?.position,
          },
        }),
      ),
    );
  }

  async answerQuestion(
    userId: string,
    chapterId: string,
    questionId: string,
    answer: Answer,
  ) {
    const userProgress = await this.prismaService.userProgress.findFirst({
      where: {
        userId,
        chapterId,
      },
    });
    const answers = [...userProgress?.answers];
    const idx = answers.findIndex((e: any) => e?.questionId == questionId);
    if (idx != -1) {
      (answers[idx] as any).answer = answer;
    } else {
      answers.push({
        questionId,
        answer,
      });
    }
    return this.prismaService.userProgress.update({
      where: {
        id: userProgress?.id,
      },
      data: {
        answers,
      },
    });
  }
}
