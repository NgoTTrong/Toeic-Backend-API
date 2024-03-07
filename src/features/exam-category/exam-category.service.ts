import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExamCategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.examCategory.findMany();
  }
  create(names: string[]) {
    return this.prismaService.examCategory.createMany({
      data: names.map((name) => ({ name })),
    });
  }
}
