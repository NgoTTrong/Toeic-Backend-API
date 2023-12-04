import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryFeedService } from './category-feed.service';
import { CreateCategoryFeedDto } from './dto/create-category-feed.dto';
import { UpdateCategoryFeedDto } from './dto/update-category-feed.dto';

@Controller('category-feed')
export class CategoryFeedController {
  constructor(private readonly categoryFeedService: CategoryFeedService) {}

  @Post()
  create(@Body() createCategoryFeedDto: CreateCategoryFeedDto) {
    return this.categoryFeedService.create(createCategoryFeedDto);
  }

  @Get()
  findAll() {
    return this.categoryFeedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryFeedService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryFeedDto: UpdateCategoryFeedDto,
  ) {
    return this.categoryFeedService.update(+id, updateCategoryFeedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryFeedService.remove(+id);
  }
}
