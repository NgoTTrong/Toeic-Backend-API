import { IsNumber, IsString } from 'class-validator';

export class DetailChapterDto {
  @IsString()
  practiceCourseId: string;
  @IsString()
  chapterId: string;
}
