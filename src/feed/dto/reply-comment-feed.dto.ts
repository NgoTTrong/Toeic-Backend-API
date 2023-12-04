import { IsNumber, IsString } from 'class-validator';

export class ReplyCommentFeedDto {
  @IsNumber()
  feedId: number;
  @IsNumber()
  commentId: number;
  @IsString()
  content: string;
}
