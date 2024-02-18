import { IsNumber, IsString } from 'class-validator';

export class CommentFeedDto {
  @IsString()
  feedId: string;
  @IsString()
  content: string;
}
