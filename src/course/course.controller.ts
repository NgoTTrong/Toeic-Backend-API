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
  create(@Body() createCourseDto: CreateCourseDto, @GetUser() user: Payload) {
    return this.courseService.create(createCourseDto, user.id);
  }

  @Get('/get-all-of-user')
  findAll(@GetUser() user: Payload) {
    return this.courseService.findAllCourseOfUser(user.id);
  }

  @Get('all')
  getAllByUser(
    @Query('categoryId') categoryId: string,
    @Query('title') title: string,
    @GetUser() user: Payload,
  ) {
    return this.courseService.getAllCoursesByUserId(
      user.id,
      categoryId ? categoryId : undefined,
      title,
    );
  }

  @Get('by-user/:courseId')
  getCourseByUser(
    @Param('courseId') courseId: string,
    @GetUser() user: Payload,
  ) {
    return this.courseService.findOneByUser(courseId, user.id);
  }
  @Get()
  getAllCourse(@GetUser() user: Payload) {
    return this.courseService.getAll(user.id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }
  @Post(':id/attachment')
  addAttachment(
    @Param('id') id: string,
    @Body() attachment: AttachmentCourseDto,
  ) {
    return this.courseService.addAttachment(id, attachment.url);
  }
  @Post(':id/chapters')
  addChapter(@Param('id') id: string, @Body() chapter: ChapterDto) {
    return this.courseService.addChapter(id, chapter);
  }
  @Post(':id/chapters/reorder')
  reorderChapter(@Param('id') id: string, @Body() reorderDto: ReorderDto) {
    return this.courseService.reorderChapters(id, reorderDto.reorderData);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
  @Delete('attachment/:attachmentId')
  removeAttachment(@Param('attachmentId') attachmentId: string) {
    return this.courseService.deleteAttachment(attachmentId);
  }
}
