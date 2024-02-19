import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseCategoryService } from './course-category.service';
import { CreateCourseCategoryDto } from './dto/create-course-category.dto';
import { UpdateCourseCategoryDto } from './dto/update-course-category.dto';
import { Public } from 'src/core/decorators';

@Controller('course-category')
export class CourseCategoryController {
  constructor(private readonly courseCategoryService: CourseCategoryService) {}
  @Get()
  @Public()
  findAll() {
    return this.courseCategoryService.findAll();
  }
  @Post()
  @Public()
  create(@Body() dto: CreateCourseCategoryDto) {
    return this.courseCategoryService.create(dto.names);
  }
}
