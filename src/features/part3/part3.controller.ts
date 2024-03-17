import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Part3Service } from './part3.service';
import { CreatePart3Dto } from './dto/create-part3.dto';
import { UpdatePart3Dto } from './dto/update-part3.dto';
import { CreatePart3V2Dto } from './dto/create-part3-v2.dto';
import { Payload } from 'src/core/type/jwt.payload';
import { GetUser, Public } from 'src/core/decorators';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ReorderDto } from './dto/reorder.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('part3')
export class Part3Controller {
  constructor(private readonly part3Service: Part3Service) {}
  @Post('/create')
  createV2(@Body() createPart3Dto: CreatePart3V2Dto, @GetUser() user: Payload) {
    return this.part3Service.createV2(createPart3Dto.title, user.id);
  }
  @Post('/create-question/:id')
  @Public()
  createQuestion(
    @Body() createQuestion: CreateQuestionDto,
    @Param('id') id: string,
  ) {
    return this.part3Service.createPart3Question(id, createQuestion);
  }
  @Patch('/update-question/:id')
  @Public()
  updateQuestion(
    @Body() updateQuestion: UpdateQuestionDto,
    @Param('id') id: string,
  ) {
    return this.part3Service.updateQuestion(id, updateQuestion);
  }
  // @Post()
  // create(@Body() createPart3Dto: CreatePart3Dto) {
  //   return this.part3Service.create(createPart3Dto);
  // }

  @Get()
  findAll(@GetUser() user: Payload) {
    return this.part3Service.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: Payload) {
    return this.part3Service.findOne(id, user.id);
  }

  @Patch(':id')
  @Public()
  update(@Param('id') id: string, @Body() updatePart3Dto: UpdatePart3Dto) {
    return this.part3Service.update(id, updatePart3Dto);
  }

  @Delete(':id')
  @Public()
  remove(@Param('id') id: string) {
    return this.part3Service.remove(id);
  }

  @Delete('/delete-question/:id')
  @Public()
  removeGroupQuestion(@Param('id') id: string) {
    return this.part3Service.removeGroup(id);
  }
  @Post(':id/questions/reorder')
  @Public()
  reorderChapter(@Param('id') id: string, @Body() reorderDto: ReorderDto) {
    return this.part3Service.reorderQuestions(id, reorderDto.reorderData);
  }
}
