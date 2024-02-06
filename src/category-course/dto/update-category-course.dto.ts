import { IsString } from 'class-validator';

export class UpdateCategoryCourseDto {
  @IsString()
  name: string;
}
