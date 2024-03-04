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

@Controller('part4')
export class Part4Controller {
  constructor(private readonly part4Service: Part4Service) {}

  // @Post()
  // create(@Body() createPart4Dto: CreatePart4Dto) {
  //   return this.part4Service.create(createPart4Dto);
  // }

  @Get()
  findAll() {
    return this.part4Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.part4Service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePart4Dto: UpdatePart4Dto) {
    return this.part4Service.update(id, updatePart4Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.part4Service.remove(id);
  }
}
