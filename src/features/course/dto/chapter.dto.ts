import { IsString } from 'class-validator';

export class ChapterDto {
  @IsString()
  title: string;
}
