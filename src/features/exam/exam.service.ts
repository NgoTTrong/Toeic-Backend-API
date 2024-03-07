import { Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExamService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createExamDto: CreateExamDto, userId: string) {
    return this.prismaService.exam.create({
      data: { ...createExamDto, creatorId: userId },
    });
  }

  findAll(userId: string) {
    return this.prismaService.exam.findMany({
      where: {
        creatorId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        title: true,
        id: true,
        isPublished: true,
        introduction: true,
        thumbnail: true,
        categoryId: true,
        part1: {
          select: {
            title: true,
            id: true,
          },
        },
        part2: {
          select: {
            title: true,
            id: true,
          },
        },
        part3: {
          select: {
            title: true,
            id: true,
          },
        },
        part4: {
          select: {
            title: true,
            id: true,
          },
        },
        part5: {
          select: {
            title: true,
            id: true,
          },
        },
        part6: {
          select: {
            title: true,
            id: true,
          },
        },
        part7: {
          select: {
            title: true,
            id: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.exam.findFirst({
      where: {
        id,
      },
      select: {
        title: true,
        id: true,
        isPublished: true,
        introduction: true,
        categoryId: true,
        thumbnail: true,
        part1: {
          select: {
            title: true,
            id: true,
          },
        },
        part2: {
          select: {
            title: true,
            id: true,
          },
        },
        part3: {
          select: {
            title: true,
            id: true,
          },
        },
        part4: {
          select: {
            title: true,
            id: true,
          },
        },
        part5: {
          select: {
            title: true,
            id: true,
          },
        },
        part6: {
          select: {
            title: true,
            id: true,
          },
        },
        part7: {
          select: {
            title: true,
            id: true,
          },
        },
      },
    });
  }

  update(id: string, updateExamDto: UpdateExamDto) {
    return this.prismaService.exam.update({
      where: { id },
      data: {
        ...updateExamDto,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} exam`;
  }
}
