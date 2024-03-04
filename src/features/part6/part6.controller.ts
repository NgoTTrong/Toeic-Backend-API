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

@Controller('part6')
export class Part6Controller {
  constructor(private readonly part6Service: Part6Service) {}

  // @Post()
  // create(@Body() createPart6Dto: CreatePart6Dto) {
  //   return this.part6Service.create(createPart6Dto);
  // }

  @Get()
  findAll() {
    return this.part6Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.part6Service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePart6Dto: UpdatePart6Dto) {
    return this.part6Service.update(id, updatePart6Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.part6Service.remove(id);
  }
}
