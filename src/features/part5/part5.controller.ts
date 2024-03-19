import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Part5Service } from './part5.service';
import { CreatePart5Dto } from './dto/create-part5.dto';
import { UpdatePart5Dto } from './dto/update-part5.dto';
import { Payload } from 'src/core/type/jwt.payload';
import { GetUser, Public } from 'src/core/decorators';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ReorderDto } from './dto/reorder.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('part5')
export class Part5Controller {
  constructor(private readonly part5Service: Part5Service) {}
  @Post('/create')
  createV2(@Body() createPart5Dto: CreatePart5Dto, @GetUser() user: Payload) {
    return this.part5Service.create(createPart5Dto.title, user.id);
  }
  @Post('/create-question/:id')
  @Public()
  createQuestion(
    @Body() createQuestion: CreateQuestionDto,
    @Param('id') id: string,
  ) {
    return this.part5Service.createPart5Question(id, createQuestion);
  }
  @Patch('/update-question/:id')
  @Public()
  updateQuestion(
    @Body() updateQuestion: UpdateQuestionDto,
    @Param('id') id: string,
  ) {
    return this.part5Service.updateQuestion(id, updateQuestion);
  }

  @Get()
  findAll(@GetUser() user: Payload) {
    return this.part5Service.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: Payload) {
    return this.part5Service.findOne(id, user.id);
  }

  @Patch(':id')
  @Public()
  update(@Param('id') id: string, @Body() updatePart5Dto: UpdatePart5Dto) {
    return this.part5Service.update(id, updatePart5Dto);
  }

  @Delete(':id')
  @Public()
  remove(@Param('id') id: string) {
    return this.part5Service.remove(id);
  }

  @Delete('/delete-question/:id')
  @Public()
  removeQuestion(@Param('id') id: string) {
    return this.part5Service.removeQuestion(id);
  }

  @Post(':id/questions/reorder')
  @Public()
  reorderChapter(@Param('id') id: string, @Body() reorderDto: ReorderDto) {
    return this.part5Service.reorderQuestions(id, reorderDto.reorderData);
  }
}
