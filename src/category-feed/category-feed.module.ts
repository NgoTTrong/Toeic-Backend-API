import { Module } from '@nestjs/common';
import { CategoryFeedService } from './category-feed.service';
import { CategoryFeedController } from './category-feed.controller';

@Module({
  controllers: [CategoryFeedController],
  providers: [CategoryFeedService],
})
export class CategoryFeedModule {}
