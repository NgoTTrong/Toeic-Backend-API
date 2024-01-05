import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Part2Service } from './part2.service';
import { CreatePart2Dto } from './dto/create-part2.dto';
import { UpdatePart2Dto } from './dto/update-part2.dto';

@Controller('part2')
export class Part2Controller {
  constructor(private readonly part2Service: Part2Service) {}

  @Post()
  create(@Body() createPart2Dto: CreatePart2Dto) {
    return this.part2Service.create(createPart2Dto);
  }

  @Get()
  findAll() {
    return this.part2Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.part2Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePart2Dto: UpdatePart2Dto) {
    return this.part2Service.update(+id, updatePart2Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.part2Service.remove(+id);
  }
}
