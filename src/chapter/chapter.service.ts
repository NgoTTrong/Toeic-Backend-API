import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Attachment, Chapter } from '@prisma/client';

@Injectable()
export class ChapterService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createChapterDto: CreateChapterDto) {
    return 'This action adds a new chapter';
  }

  findAll() {
    return `This action returns all chapter`;
  }

  findOne(id: number) {
    return this.prismaService.chapter.findFirst({
      where: { id },
    });
  }
  async getDetailChapter(chapterId: number, courseId: number, userId: number) {
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

  async update(id: number, updateChapterDto: UpdateChapterDto) {
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

  async remove(id: number, courseId: number) {
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
}
