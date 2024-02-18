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

@Controller('part1')
export class Part1Controller {
  constructor(private readonly part1Service: Part1Service) {}

  @Post()
  create(@Body() createPart1Dto: CreatePart1Dto) {
    return this.part1Service.create(createPart1Dto);
  }

  @Get()
  findAll() {
    return this.part1Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.part1Service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePart1Dto: UpdatePart1Dto) {
    return this.part1Service.update(id, updatePart1Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.part1Service.remove(id);
  }
}
