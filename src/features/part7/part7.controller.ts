import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Part7Service } from './part7.service';
import { CreatePart7Dto } from './dto/create-part7.dto';
import { UpdatePart7Dto } from './dto/update-part7.dto';
import { GetUser, Public } from 'src/core/decorators';
import { Payload } from 'src/core/type/jwt.payload';
import { ReorderDto } from './dto/reorder.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('part7')
export class Part7Controller {
  constructor(private readonly part7Service: Part7Service) {}

  @Post('/create')
  create(@Body() createPart7Dto: CreatePart7Dto, @GetUser() user: Payload) {
    return this.part7Service.create(createPart7Dto.title, user.id)
  }

  @Post('/create-question/:id')
  @Public()
  createQuestion(
    @Body() createQuestion: CreateQuestionDto,
    @Param('id') id: string,
  ) {
    return this.part7Service.createPart7Question(id, createQuestion);
  }
  @Patch('/update-question/:id')
  @Public()
  updateQuestion(
    @Body() updateQuestion: UpdateQuestionDto,
    @Param('id') id: string,
  ) {
    return this.part7Service.updateQuestion(id, updateQuestion);
  }


  @Get()
  findAll(@GetUser() user: Payload) {
    return this.part7Service.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: Payload) {
    return this.part7Service.findOne(id, user.id);
  }

  @Patch(':id')
  @Public()
  update(@Param('id') id: string, @Body() updatePart7Dto: UpdatePart7Dto) {
    return this.part7Service.update(id, updatePart7Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.part7Service.remove(id);
  }

  @Delete('/delete-question/:id')
  @Public()
  removeGroupQuestion(@Param('id') id: string) {
    return this.part7Service.removeGroup(id);
  }

  @Post(':id/questions/reorder')
  @Public()
  reorderChapter(@Param('id') id: string, @Body() reorderDto: ReorderDto) {
    return this.part7Service.reorderQuestions(id, reorderDto.reorderData);
  }

}
