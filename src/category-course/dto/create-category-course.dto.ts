import { IsArray, IsString } from 'class-validator';

export class CreateCategoryCourseDto {
  @IsArray()
  names: string[];
}
