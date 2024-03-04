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

@Controller('part5')
export class Part5Controller {
  constructor(private readonly part5Service: Part5Service) {}

  // @Post()
  // create(@Body() createPart5Dto: CreatePart5Dto) {
  //   return this.part5Service.create(createPart5Dto);
  // }

  @Get()
  findAll() {
    return this.part5Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.part5Service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePart5Dto: UpdatePart5Dto) {
    return this.part5Service.update(id, updatePart5Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.part5Service.remove(id);
  }
}
