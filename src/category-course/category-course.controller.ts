import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryCourseService } from './category-course.service';
import { CreateCategoryCourseDto } from './dto/create-category-course.dto';
import { UpdateCategoryCourseDto } from './dto/update-category-course.dto';
import { Public } from 'src/core/decorators';

@Controller('category-course')
export class CategoryCourseController {
  constructor(private readonly categoryCourseService: CategoryCourseService) {}

  @Post()
  create(@Body() createCategoryCourseDto: CreateCategoryCourseDto) {
    return this.categoryCourseService.create(createCategoryCourseDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.categoryCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryCourseService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryCourseDto: UpdateCategoryCourseDto,
  ) {
    return this.categoryCourseService.update(+id, updateCategoryCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryCourseService.remove(+id);
  }
}
