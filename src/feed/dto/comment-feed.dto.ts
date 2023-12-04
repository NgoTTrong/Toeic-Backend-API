import { IsNumber, IsString } from 'class-validator';

export class CommentFeedDto {
  @IsNumber()
  feedId: number;
  @IsString()
  content: string;
}
