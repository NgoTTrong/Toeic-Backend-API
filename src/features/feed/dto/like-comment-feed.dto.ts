import { IsNumber, IsString } from 'class-validator';

export class LikeCommentFeedDto {
  @IsString()
  commentId: string;
}
