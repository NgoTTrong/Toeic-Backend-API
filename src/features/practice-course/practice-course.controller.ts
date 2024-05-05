import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PracticeCourseService } from './practice-course.service';
import { GetUser, Public } from 'src/core/decorators';
import { Payload } from 'src/core/type/jwt.payload';
import { DetailChapterDto } from './dto/detail-chapter.dto';

@Controller('practice-course')
export class PracticeCourseController {
  constructor(private readonly practiceCourseService: PracticeCourseService) {}

  @Post('detail')
  getDetailChapter(@Body() dto: DetailChapterDto, @GetUser() user: Payload) {
    return this.practiceCourseService.getDetailChapter(
      dto.chapterId,
      dto.practiceCourseId,
      user.id,
    );
  }

  @Get('progress/:id')
  getProgress(@GetUser() user: Payload, @Param('id') id: string) {
    return this.practiceCourseService.getAllProgress(id, user?.id);
  }

  @Get()
  findAll(@GetUser() user: Payload) {
    return this.practiceCourseService.findAll(user?.id);
  }
  @Get(':id')
  findOne(@GetUser() user: Payload, @Param('id') id: string) {
    return this.practiceCourseService.findOneByUser(id, user?.id);
  }
}
