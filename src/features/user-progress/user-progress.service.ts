import { Injectable } from '@nestjs/common';
import { CreateUserProgressDto } from './dto/create-user-progress.dto';
import { UpdateUserProgressDto } from './dto/update-user-progress.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserProgressService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAllProgress(courseId: string, userId: string) {
    const publishedChapters = await this.prismaService.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: { id: true },
    });
    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);
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
  create(createUserProgressDto: CreateUserProgressDto) {
    return 'This action adds a new userProgress';
  }

  findAll() {
    return `This action returns all userProgress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userProgress`;
  }

  update(id: string, updateUserProgressDto: UpdateUserProgressDto) {
    return this.prismaService.userProgress.update({
      where: { id },
      data: updateUserProgressDto,
    });
  }
  updateOrCreate(updateUserProgressDto: UpdateUserProgressDto, userId: string) {
    return this.prismaService.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId: userId,
          chapterId: updateUserProgressDto.chapterId,
        },
      },
      update: {
        isCompleted: updateUserProgressDto.isCompleted,
      },
      create: {
        userId: userId,
        chapterId: updateUserProgressDto.chapterId,
        isCompleted: updateUserProgressDto.isCompleted,
      },
    });
  }
  remove(id: number) {
    return `This action removes a #${id} userProgress`;
  }
}
