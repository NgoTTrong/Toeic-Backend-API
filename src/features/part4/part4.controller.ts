import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Part4Service } from './part4.service';
import { CreatePart4Dto } from './dto/create-part4.dto';
import { UpdatePart4Dto } from './dto/update-part4.dto';
import { GetUser, Public } from 'src/core/decorators';
import { Payload } from 'src/core/type/jwt.payload';
import { ReorderDto } from './dto/reorder.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('part4')
export class Part4Controller {
  constructor(private readonly part4Service: Part4Service) {}

  @Post('/create')
  create(@Body() createPart4Dto: CreatePart4Dto, @GetUser() user: Payload) {
    return this.part4Service.create(createPart4Dto.title, user.id)
  }

  @Post('/create-question/:id')
  @Public()
  createQuestion(
    @Body() createQuestion: CreateQuestionDto,
    @Param('id') id: string,
  ) {
    return this.part4Service.createPart4Question(id, createQuestion);
  }
  @Patch('/update-question/:id')
  @Public()
  updateQuestion(
    @Body() updateQuestion: UpdateQuestionDto,
    @Param('id') id: string,
  ) {
    return this.part4Service.updateQuestion(id, updateQuestion);
  }


  @Get()
  findAll(@GetUser() user: Payload) {
    return this.part4Service.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: Payload) {
    return this.part4Service.findOne(id, user.id);
  }

  @Patch(':id')
  @Public()
  update(@Param('id') id: string, @Body() updatePart4Dto: UpdatePart4Dto) {
    return this.part4Service.update(id, updatePart4Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.part4Service.remove(id);
  }

  @Delete('/delete-question/:id')
  @Public()
  removeGroupQuestion(@Param('id') id: string) {
    return this.part4Service.removeGroup(id);
  }

  @Post(':id/questions/reorder')
  @Public()
  reorderChapter(@Param('id') id: string, @Body() reorderDto: ReorderDto) {
    return this.part4Service.reorderQuestions(id, reorderDto.reorderData);
  }

}
