import { Injectable } from '@nestjs/common';
import { CreateCourseCategoryDto } from './dto/create-course-category.dto';
import { UpdateCourseCategoryDto } from './dto/update-course-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CourseCategoryService {
  constructor(private readonly prismaService: PrismaService){}

  findAll() {
    return this.prismaService.courseCategory.findMany()
  }
  create(names:string[]){
    return this.prismaService.courseCategory.createMany({data:names.map(name=>({name}))})
  }
}
