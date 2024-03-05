import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Public } from 'src/core/decorators';
import { CreateExamCategoryDto } from './dto/create-exam-category.dto';
import { ExamCategoryService } from './exam-category.service';

@Controller('exam-category')
export class ExamCategoryController {
  constructor(private readonly examCategoryService: ExamCategoryService) {}
  @Get()
  @Public()
  findAll() {
    return this.examCategoryService.findAll();
  }
  @Post()
  @Public()
  create(@Body() dto: CreateExamCategoryDto) {
    return this.examCategoryService.create(dto.names);
  }
}
