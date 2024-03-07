import { IsArray } from 'class-validator';

export class CreateExamCategoryDto {
  @IsArray()
  names: string[];
}
