import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { GetUser, Public } from 'src/core/decorators';
import { Payload } from 'src/core/type/jwt.payload';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  create(@Body() createExamDto: CreateExamDto, @GetUser() user: Payload) {
    return this.examService.create(createExamDto, user.id);
  }

  @Get()
  findAll(@GetUser() user: Payload) {
    return this.examService.findAll(user?.id);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.examService.findOne(id);
  }
  @Get('detail/:id')
  @Public()
  findOneDetail(@Param('id') id: string) {
    return this.examService.findOneDetail(id);
  }
  @Patch(':id')
  @Public()
  update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
    return this.examService.update(id, updateExamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examService.remove(+id);
  }
}
