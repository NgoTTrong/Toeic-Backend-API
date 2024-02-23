import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedCategoryDto } from './create-feed-category.dto';

export class UpdateFeedCategoryDto extends PartialType(CreateFeedCategoryDto) {}
