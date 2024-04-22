import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Attachment, Chapter } from '@prisma/client';
import { AddQuestionDto } from './dto/add-question.dto';

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
        position: chapters?.length + 1,
      },
    });
  }
}
