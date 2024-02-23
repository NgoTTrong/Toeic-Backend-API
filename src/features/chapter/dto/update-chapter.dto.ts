import { PartialType } from '@nestjs/mapped-types';
import { CreateChapterDto } from './create-chapter.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateChapterDto extends PartialType(CreateChapterDto) {
  @IsString()
  @IsOptional()
  courseId: string;
}
