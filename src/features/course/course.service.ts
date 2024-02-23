import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChapterDto } from './dto/chapter.dto';
import { Course } from '@prisma/client';
import { UserProgressService } from '../user-progress/user-progress.service';

@Injectable()
export class CourseService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userProgressService: UserProgressService,
  ) {}
  create(createCourseDto: CreateCourseDto, userId: string) {
    return this.prismaService.course.create({
      data: { ...createCourseDto, userId },
      include: {
        attachments: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }
  async getAll(userId: string) {
    return this.prismaService.course.findMany({ where: { userId: userId } });
  }
  async findAllCourseOfUser(userId: string) {
    const purchaseCourses = await this.prismaService.payment.findMany({
      where: {
        userId,
      },
      include: {
        course: {
          include: {
            category: true,
            chapters: {
              where: { isPublished: true },
            },
          },
        },
      },
    });
    const courses: any[] = purchaseCourses?.map((purchase) => ({
      course: purchase.course,
    }));

    for (let course of courses) {
      const progress = await this.userProgressService.getAllProgress(
        course?.course?.id,
        userId,
      );

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
  async getAllCoursesByUserId(
    userId: string,
    categoryId?: string,
    title?: string,
  ) {
    const courses = await this.prismaService.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        payment: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const coursesWithUserProgress = await Promise.all(
      courses.map(async (course) => {
        if (course.payment.length == 0) {
          return {
            course,
            progress: null,
          };
        } else {
          const userProgress = await this.userProgressService.getAllProgress(
            course?.id,
            userId,
          );
          return {
            course,
            progress: userProgress,
          };
        }
      }),
    );
    return coursesWithUserProgress;
  }
  findOneByUser(id: string, userId: string) {
    return this.prismaService.course.findFirst({
      where: { id },
      include: {
        attachments: {
          orderBy: { createdAt: 'desc' },
        },
        chapters: {
          where: {
            isPublished: true,
          },
          include: {
            userProgress: {
              where: {
                userId,
              },
            },
          },
          orderBy: {
            position: 'asc',
          },
        },
      },
    });
  }
  findOne(id: string) {
    return this.prismaService.course.findFirst({
      where: { id },
      include: {
        attachments: {
          orderBy: { createdAt: 'desc' },
        },
        chapters: {
          orderBy: {
            position: 'asc',
          },
        },
      },
    });
  }

  update(id: string, updateCourseDto: UpdateCourseDto) {
    return this.prismaService.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  async remove(id: string) {
    const _course = await this.prismaService.course.findFirst({
      where: {
        id,
      },
    });
    if (!_course) {
      throw new BadRequestException('Course is not found');
    }
    return this.prismaService.course.delete({ where: { id } });
  }

  async addAttachment(courseId: string, url: string) {
    const _course = await this.prismaService.course.findFirst({
      where: {
        id: courseId,
      },
    });
    if (!_course) {
      throw new BadRequestException('Course not found');
    }
    return this.prismaService.attachment.create({
      data: {
        url,
        name: url.split('/').pop(),
        courseId,
      },
    });
  }

  async addChapter(courseId: string, chapter: ChapterDto) {
    const lastChapter = await this.prismaService.chapter.findFirst({
      where: {
        courseId,
      },
      orderBy: {
        position: 'desc',
      },
    });
    return this.prismaService.chapter.create({
      data: {
        courseId,
        ...chapter,
        position: lastChapter ? lastChapter.position + 1 : 1,
      },
    });
  }
  deleteAttachment(attachmentId: string) {
    return this.prismaService.attachment.delete({
      where: { id: attachmentId },
    });
  }

  async reorderChapters(
    courseId: string,
    updateData: { id: string; position: number }[],
  ) {
    const _course = await this.prismaService.course.findFirst({
      where: { id: courseId },
    });
    if (!_course) {
      throw new BadRequestException('Course is not found!');
    }
    return await Promise.all(
      updateData.map((chapter) =>
        this.prismaService.chapter.update({
          where: {
            courseId,
            id: chapter?.id,
          },
          data: {
            position: chapter?.position,
          },
        }),
      ),
    );
  }
}
