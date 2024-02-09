import { IsNumber } from 'class-validator';

export class DetailChapterDto {
  @IsNumber()
  userId: number;
  @IsNumber()
  courseId: number;
  @IsNumber()
  chapterId: number;
}
