import { IsNumber, IsString } from 'class-validator';

export class DetailChapterDto {
  @IsString()
  courseId: string;
  @IsString()
  chapterId: string;
}
