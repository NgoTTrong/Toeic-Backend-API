import { Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExamService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createExamDto: CreateExamDto) {
    return this.prismaService.exam.create({
      data: createExamDto,
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

  findOne(id: number) {
    return `This action returns a #${id} exam`;
  }

  update(id: number, updateExamDto: UpdateExamDto) {
    return `This action updates a #${id} exam`;
  }

  remove(id: number) {
    return `This action removes a #${id} exam`;
  }
}
