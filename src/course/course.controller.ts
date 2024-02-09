import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { GetUser, Public } from 'src/core/decorators';
import { Payload } from 'src/core/type/jwt.payload';
import { AttachmentCourseDto } from './dto/attachment-course.dto';
import { ChapterDto } from './dto/chapter.dto';
import { ReorderDto } from './dto/reorder.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @Public()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto, 1);
  }

  @Get('/get-all-of-user')
  @Public()
  findAll() {
    return this.courseService.findAllCourseOfUser(1);
  }

  @Get('all/:userId')
  @Public()
  getAllByUser(
    @Param('userId') userId: number,
    @Query('categoryId') categoryId: number,
    @Query('title') title: string,
  ) {
    return this.courseService.getAllCoursesByUserId(
      Number(userId),
      categoryId ? Number(categoryId) : undefined,
      title,
    );
  }

  @Get('by-user/:courseId')
  @Public()
  getCourseByUser(
    @Param('courseId') courseId: number,
    @Query('userId') userId: number,
  ) {
    return this.courseService.findOneByUser(+courseId, Number(userId));
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  @Public()
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }
  @Post(':id/attachment')
  @Public()
  addAttachment(
    @Param('id') id: string,
    @Body() attachment: AttachmentCourseDto,
  ) {
    return this.courseService.addAttachment(+id, attachment.url);
  }
  @Post(':id/chapters')
  @Public()
  addChapter(@Param('id') id: string, @Body() chapter: ChapterDto) {
    return this.courseService.addChapter(+id, chapter);
  }
  @Post(':id/chapters/reorder')
  @Public()
  reorderChapter(@Param('id') id: string, @Body() reorderDto: ReorderDto) {
    return this.courseService.reorderChapters(+id, reorderDto.reorderData);
  }
  @Delete(':id')
  @Public()
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
  @Delete('attachment/:attachmentId')
  @Public()
  removeAttachment(@Param('attachmentId') attachmentId: number) {
    return this.courseService.deleteAttachment(+attachmentId);
  }
}
