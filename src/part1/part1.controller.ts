import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Part1Service } from './part1.service';
import { CreatePart1Dto } from './dto/create-part1.dto';
import { UpdatePart1Dto } from './dto/update-part1.dto';
import { CreatePart1V2Dto } from './dto/create-part1-v2.dto';
import { Payload } from 'src/core/type/jwt.payload';
import { GetUser, Public } from 'src/core/decorators';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller('part1')
export class Part1Controller {
  constructor(private readonly part1Service: Part1Service) {}
  @Post('/create')
  createV2(@Body() createPart1Dto: CreatePart1V2Dto, @GetUser() user: Payload) {
    return this.part1Service.createV2(createPart1Dto.title, user.id);
  }
  @Post('/create-question/:id')
  @Public()
  createQuestion(
    @Body() createQuestion: CreateQuestionDto,
    @Param('id') id: string,
  ) {
    return this.part1Service.createPart1Question(id, createQuestion);
  }

  @Post()
  create(@Body() createPart1Dto: CreatePart1Dto) {
    return this.part1Service.create(createPart1Dto);
  }

  @Get()
  findAll(@GetUser() user: Payload) {
    return this.part1Service.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: Payload) {
    return this.part1Service.findOne(id, user.id);
  }

  @Patch(':id')
  @Public()
  update(@Param('id') id: string, @Body() updatePart1Dto: UpdatePart1Dto) {
    return this.part1Service.update(id, updatePart1Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.part1Service.remove(id);
  }
}
