import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Part2Service } from './part2.service';
import { CreatePart2Dto } from './dto/create-part2.dto';
import { UpdatePart2Dto } from './dto/update-part2.dto';
import { CreatePart2V2Dto } from './dto/create-part2-v2.dto';
import { Payload } from 'src/core/type/jwt.payload';
import { GetUser, Public } from 'src/core/decorators';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ReorderDto } from './dto/reorder.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('part2')
export class Part2Controller {
  constructor(private readonly part2Service: Part2Service) {}
  @Post('/create')
  createV2(@Body() createPart2Dto: CreatePart2V2Dto, @GetUser() user: Payload) {
    return this.part2Service.createV2(createPart2Dto.title, user.id);
  }
  @Post('/create-question/:id')
  @Public()
  createQuestion(
    @Body() createQuestion: CreateQuestionDto,
    @Param('id') id: string,
  ) {
    return this.part2Service.createpart2Question(id, createQuestion);
  }
  @Patch('/update-question/:id')
  @Public()
  updateQuestion(
    @Body() updateQuestion: UpdateQuestionDto,
    @Param('id') id: string,
  ) {
    return this.part2Service.updateQuestion(id, updateQuestion);
  }
  // @Post()
  // create(@Body() createpart2Dto: CreatePart2Dto) {
  //   return this.part2Service.create(createpart2Dto);
  // }

  @Get()
  findAll(@GetUser() user: Payload) {
    return this.part2Service.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: Payload) {
    return this.part2Service.findOne(id, user.id);
  }

  @Patch(':id')
  @Public()
  update(@Param('id') id: string, @Body() updatepart2Dto: UpdatePart2Dto) {
    return this.part2Service.update(id, updatepart2Dto);
  }

  @Delete(':id')                      
  @Public()
  remove(@Param('id') id: string) {
    return this.part2Service.remove(id);
  }
  @Delete('/delete-question/:id')
  @Public()
  removeQuestion(@Param('id') id: string) {
    return this.part2Service.removeQuestion(id);
  }

  @Post(':id/questions/reorder')
  @Public()
  reorderQuestion(@Param('id') id: string, @Body() reorderDto: ReorderDto) {
    return this.part2Service.reorderQuestions(id, reorderDto.reorderData);
  }
}
