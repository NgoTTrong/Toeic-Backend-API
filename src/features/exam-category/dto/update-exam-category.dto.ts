import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseCategoryDto } from 'src/features/course-category/dto/create-course-category.dto';

export class UpdateExamCategoryDto extends PartialType(
  CreateCourseCategoryDto,
) {}
