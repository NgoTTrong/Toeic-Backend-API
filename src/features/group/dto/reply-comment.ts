import { IsOptional, IsString } from 'class-validator';

export class ReplyCommentPostDto {
  @IsString()
  message: string;
  @IsString()
  commentId: string;
}
