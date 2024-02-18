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

@Controller('part7')
export class Part7Controller {
  constructor(private readonly part7Service: Part7Service) {}

  @Post()
  create(@Body() createPart7Dto: CreatePart7Dto) {
    return this.part7Service.create(createPart7Dto);
  }

  @Get()
  findAll() {
    return this.part7Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.part7Service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePart7Dto: UpdatePart7Dto) {
    return this.part7Service.update(id, updatePart7Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.part7Service.remove(id);
  }
}
