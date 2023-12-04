import { IsNumber, IsString } from 'class-validator';

export class CreateFeedDto {
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsString()
  thumbnail: string;
  @IsNumber()
  categoryId: number;
}
