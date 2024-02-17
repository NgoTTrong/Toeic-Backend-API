import { PartialType } from '@nestjs/mapped-types';
import { CreateChapterDto } from './create-chapter.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateChapterDto extends PartialType(CreateChapterDto) {
  @IsNumber()
  @IsOptional()
  courseId: number;
}
