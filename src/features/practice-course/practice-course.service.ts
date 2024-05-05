import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ChapterQuestion,
  PracticeCourse,
  PracticeCourseChapter,
} from '@prisma/client';

@Injectable()
export class PracticeCourseService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(userId: string) {
    const courses: (PracticeCourse & { progress?: number })[] =
      await this.prismaService.practiceCourse.findMany({
        where: {
          userId,
        },
        include: {
          PracticeCourseChapter: {
            orderBy: {
              createdAt: 'asc',
            },
          },
        },
      });

    for (let course of courses) {
      const progress = await this.getAllProgress(course?.id, userId);

      course['progress'] = progress;
    }

    const completedCourses = courses.filter(
      (course) => (course.progress ?? 0) == 100,
    );
    const inCompletedCourses = courses.filter(
      (course) => (course.progress ?? 0) < 100,
    );
    return {
      completedCourses,
      inCompletedCourses,
    };
  }

  async getAllProgress(practiceCourseId: string, userId: string) {
    const publishedChapters =
      await this.prismaService.practiceCourseChapter.findMany({
        where: {
          practiceCourseId,
        },
      });
    const publishedChapterIds = publishedChapters.map(
      (chapter) => chapter.chapterId,
    );
    const validCompletedChapters = await this.prismaService.userProgress.count({
      where: {
        userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      },
    });

    const percentage =
      (validCompletedChapters * 100) / publishedChapters.length;
    return percentage;
  }

  findOneByUser(id: string, userId: string) {
    return this.prismaService.practiceCourse.findFirst({
      where: { id, userId },
      include: {
        PracticeCourseChapter: {
          include: {
            chapter: {
              include: {
                userProgress: {
                  where: {
                    userId,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  }

  async getDetailChapter(
    chapterId: string,
    practiceCourseId: string,
    userId: string,
  ) {
    const course = await this.prismaService.practiceCourse.findFirst({
      where: { id: practiceCourseId },
    });

    const chapters = await this.prismaService.practiceCourseChapter.findMany({
      where: {
        practiceCourseId,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        chapter: true,
      },
    });
    const idx = chapters.findIndex(
      (chapter) => chapter?.chapterId == chapterId,
    );
    const chapter = chapters?.[idx];
    if (!chapter || !course) {
      throw new BadRequestException('Chapter or course not found.');
    }
    let questions: ChapterQuestion[] = [];
    let nextChapter: PracticeCourseChapter | null = chapters?.[idx + 1] ?? null;

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

    const userProgress = await this.prismaService.userProgress.findFirst({
      where: {
        userId,
        chapterId,
      },
    });
    return {
      chapter,
      nextChapter,
      course,
      userProgress,
      questions,
    };
  }
}
