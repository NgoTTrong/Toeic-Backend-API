import { IsOptional, IsString } from 'class-validator';

export class CommentPostDto {
  @IsString()
  message: string;
}
