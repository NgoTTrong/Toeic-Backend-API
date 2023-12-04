import { IsNumber } from 'class-validator';

export class LikeCommentFeedDto {
  @IsNumber()
  commentId: number;
}
