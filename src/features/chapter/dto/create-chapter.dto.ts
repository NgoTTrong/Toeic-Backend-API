import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateChapterDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsBoolean()
  isFree: boolean;
  @IsString()
  videoUrl: string;
  @IsBoolean()
  isPublished: boolean;
  @IsString()
  @IsOptional()
  topicId: string;
}
