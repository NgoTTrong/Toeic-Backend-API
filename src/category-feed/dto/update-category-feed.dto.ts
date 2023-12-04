import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryFeedDto } from './create-category-feed.dto';

export class UpdateCategoryFeedDto extends PartialType(CreateCategoryFeedDto) {}
