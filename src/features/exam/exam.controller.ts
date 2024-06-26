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
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { GetUser, Public } from 'src/core/decorators';
import { Payload } from 'src/core/type/jwt.payload';
import { SubmitExamDto } from './dto/submit-exam.dto';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post('/submit/:examId')
  submitExam(
    @Body() dto: SubmitExamDto,
    @GetUser() user: Payload,
    @Param('examId') examId: string,
  ) {
    return this.examService.submitExam(user.id, examId, dto?.result, dto?.time);
  }
  @Get('/history')
  getHistories(@GetUser() user: Payload) {
    return this.examService.getHistories(user?.id);
  }
  @Get('/history/:historyId')
  @Public()
  getHistoryExam(@Param('historyId') historyId: string) {
    return this.examService.getHistoryExam(historyId);
  }
  @Get('/get-all-of-user')
  @Public()
  findAllByUser(@Query('userId') userId: string) {
    return this.examService.findAllByUser();
  }

  @Get('detail/:id')
  @Public()
  findOneDetail(@Param('id') id: string) {
    return this.examService.findOneDetail(id);
  }
  @Get('receive-course/:historyId')
  receiveCourse(
    @Param('historyId') historyId: string,
    @GetUser() user: Payload,
  ) {
    return this.examService.receiveCoursePractive(historyId, user?.id);
  }

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
