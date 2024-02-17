import { Injectable } from '@nestjs/common';
import { CreateCategoryCourseDto } from './dto/create-category-course.dto';
import { UpdateCategoryCourseDto } from './dto/update-category-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryCourseService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createCategoryCourseDto: CreateCategoryCourseDto) {
    return this.prismaService.categoryCourse.createMany({
      data: createCategoryCourseDto?.names?.map((name) => ({ name })),
    });
  }

  findAll() {
    return this.prismaService.categoryCourse.findMany({});
  }

  findOne(id: number) {
    return this.prismaService.categoryCourse.findFirst({ where: { id } });
  }

  update(id: number, updateCategoryCourseDto: UpdateCategoryCourseDto) {
    return this.prismaService.categoryCourse.update({
      where: { id },
      data: updateCategoryCourseDto,
    });
  }

  remove(id: number) {
    return this.prismaService.categoryCourse.delete({ where: { id } });
  }
}
