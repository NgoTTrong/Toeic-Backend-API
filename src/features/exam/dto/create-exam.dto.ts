import { IsString } from 'class-validator';

export class CreateExamDto {
  @IsString()
  title: string;

  @IsString()
  categoryId: string;
}
