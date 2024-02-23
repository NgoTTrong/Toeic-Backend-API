import { Module } from '@nestjs/common';
import { FeedCategoryService } from './feed-category.service';
import { FeedCategoryController } from './feed-category.controller';

@Module({
  controllers: [FeedCategoryController],
  providers: [FeedCategoryService],
})
export class FeedCategoryModule {}
