import { IsNumber, IsString } from 'class-validator';

export class ReplyCommentFeedDto {
  @IsString()
  feedId: string;
  @IsString()
  commentId: string;
  @IsString()
  content: string;
}
