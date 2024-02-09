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
import { Public } from 'src/core/decorators';
import { DetailChapterDto } from './dto/detail-chapter.dto';

@Controller('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post()
  create(@Body() createChapterDto: CreateChapterDto) {
    return this.chapterService.create(createChapterDto);
  }

  @Get()
  findAll() {
    return this.chapterService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.chapterService.findOne(+id);
  }
  @Post('detail')
  @Public()
  getDetailChapter(@Body() dto: DetailChapterDto) {
    return this.chapterService.getDetailChapter(
      dto.chapterId,
      dto.courseId,
      dto.userId,
    );
  }

  @Patch(':id')
  @Public()
  update(@Param('id') id: string, @Body() updateChapterDto: UpdateChapterDto) {
    return this.chapterService.update(+id, updateChapterDto);
  }

  @Delete(':id/courses/:courseId')
  @Public()
  remove(@Param('id') id: string, @Param('courseId') courseId: string) {
    return this.chapterService.remove(+id, +courseId);
  }
}
