import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExamCategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.courseCategory.findMany();
  }
  create(names: string[]) {
    return this.prismaService.courseCategory.createMany({
      data: names.map((name) => ({ name })),
    });
  }
}
