import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FeedCategoryService } from './feed-category.service';
import { CreateFeedCategoryDto } from './dto/create-feed-category.dto';
import { UpdateFeedCategoryDto } from './dto/update-feed-category.dto';

@Controller('feed-category')
export class FeedCategoryController {
  constructor(private readonly feedCategoryService: FeedCategoryService) {}

  @Post()
  create(@Body() createFeedCategoryDto: CreateFeedCategoryDto) {
    return this.feedCategoryService.create(createFeedCategoryDto);
  }

  @Get()
  findAll() {
    return this.feedCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedCategoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFeedCategoryDto: UpdateFeedCategoryDto,
  ) {
    return this.feedCategoryService.update(id, updateFeedCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedCategoryService.remove(id);
  }
}
