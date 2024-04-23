import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { GetUser, Public } from 'src/core/decorators';
import { DetailChapterDto } from './dto/detail-chapter.dto';
import { Payload } from 'src/core/type/jwt.payload';
import { AddQuestionDto } from './dto/add-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ReorderDto } from './dto/reorder.dto';
import { AnswerQuestion } from './dto/answer-question';

@Controller('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post('add-question/:chapterId')
  @Public()
  addQuestion(
    @Body() dto: AddQuestionDto,
    @Param('chapterId') chapterId: string,
  ) {
    return this.chapterService.addQuestion(chapterId, dto);
  }

  @Delete('delete-question/:questionId')
  @Public()
  deleteQuestion(@Param('questionId') questionId: string) {
    return this.chapterService.deleteQuestion(questionId);
  }

  @Patch('update-question/:questionId')
  @Public()
  updateQuestion(
    @Param('questionId') questionId: string,
    @Body() dto: UpdateQuestionDto,
  ) {
    return this.chapterService.updateQuestion(questionId, dto);
  }
  @Post('reorder-questions/:chapterId')
  @Public()
  reorderQuestion(
    @Param('chapterId') chapterId: string,
    @Body() reorderDto: ReorderDto,
  ) {
    return this.chapterService.reorderQuestions(
      chapterId,
      reorderDto.reorderData,
    );
  }

  @Post('answer-question/:chapterId')
  answer(
    @Param('chapterId') chapterId: string,
    @Body() dto: AnswerQuestion,
    @GetUser() user: Payload,
  ) {
    return this.chapterService.answerQuestion(
      user?.id,
      chapterId,
      dto?.questionId,
      dto?.answer,
    );
  }

  @Post()
  @Public()
  create(@Body() createChapterDto: CreateChapterDto) {
    return this.chapterService.create(createChapterDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.chapterService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.chapterService.findOne(id);
  }
  @Post('detail')
  getDetailChapter(@Body() dto: DetailChapterDto, @GetUser() user: Payload) {
    return this.chapterService.getDetailChapter(
      dto.chapterId,
      dto.courseId,
      user.id,
    );
  }

  @Patch(':id')
  @Public()
  update(@Param('id') id: string, @Body() updateChapterDto: UpdateChapterDto) {
    return this.chapterService.update(id, updateChapterDto);
  }

  @Delete(':id/courses/:courseId')
  @Public()
  remove(@Param('id') id: string, @Param('courseId') courseId: string) {
    return this.chapterService.remove(id, courseId);
  }
}
