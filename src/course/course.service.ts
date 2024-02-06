import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChapterDto } from './dto/chapter.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createCourseDto: CreateCourseDto, userId: number) {
    return this.prismaService.course.create({
      data: { ...createCourseDto, userId },
      include: {
        attachments: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  findAll() {
    return this.prismaService.course.findMany({});
  }

  findOne(id: number) {
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

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.prismaService.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  remove(id: number) {
    return this.prismaService.course.delete({ where: { id } });
  }

  async addAttachment(courseId: number, url: string) {
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

  async addChapter(courseId: number, chapter: ChapterDto) {
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
  deleteAttachment(attachmentId: number) {
    return this.prismaService.attachment.delete({
      where: { id: attachmentId },
    });
  }
}
