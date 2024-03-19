import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Part6Service } from './part6.service';
import { CreatePart6Dto } from './dto/create-part6.dto';
import { UpdatePart6Dto } from './dto/update-part6.dto';
import { GetUser, Public } from 'src/core/decorators';
import { Payload } from 'src/core/type/jwt.payload';
import { ReorderDto } from './dto/reorder.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('part6')
export class Part6Controller {
  constructor(private readonly part6Service: Part6Service) {}

  @Post('/create')
  create(@Body() createPart6Dto: CreatePart6Dto, @GetUser() user: Payload) {
    return this.part6Service.create(createPart6Dto.title, user.id)
  }

  @Post('/create-question/:id')
  @Public()
  createQuestion(
    @Body() createQuestion: CreateQuestionDto,
    @Param('id') id: string,
  ) {
    return this.part6Service.createPart6Question(id, createQuestion);
  }
  @Patch('/update-question/:id')
  @Public()
  updateQuestion(
    @Body() updateQuestion: UpdateQuestionDto,
    @Param('id') id: string,
  ) {
    return this.part6Service.updateQuestion(id, updateQuestion);
  }


  @Get()
  findAll(@GetUser() user: Payload) {
    return this.part6Service.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: Payload) {
    return this.part6Service.findOne(id, user.id);
  }

  @Patch(':id')
  @Public()
  update(@Param('id') id: string, @Body() updatePart6Dto: UpdatePart6Dto) {
    return this.part6Service.update(id, updatePart6Dto);
  }

  @Delete(':id')
  @Public()
  remove(@Param('id') id: string) {
    return this.part6Service.remove(id);
  }

  @Delete('/delete-question/:id')
  @Public()
  removeGroupQuestion(@Param('id') id: string) {
    return this.part6Service.removeGroup(id);
  }

  @Post(':id/questions/reorder')
  @Public()
  reorderChapter(@Param('id') id: string, @Body() reorderDto: ReorderDto) {
    return this.part6Service.reorderQuestions(id, reorderDto.reorderData);
  }

}
