import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Part3Service } from './part3.service';
import { CreatePart3Dto } from './dto/create-part3.dto';
import { UpdatePart3Dto } from './dto/update-part3.dto';

@Controller('part3')
export class Part3Controller {
  constructor(private readonly part3Service: Part3Service) {}

  @Post()
  create(@Body() createPart3Dto: CreatePart3Dto) {
    return this.part3Service.create(createPart3Dto);
  }

  @Get()
  findAll() {
    return this.part3Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.part3Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePart3Dto: UpdatePart3Dto) {
    return this.part3Service.update(+id, updatePart3Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.part3Service.remove(+id);
  }
}
