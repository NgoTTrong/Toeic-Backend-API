import { IsOptional, IsString } from 'class-validator';

export class CreatePost {
  @IsString()
  name: string;
  @IsString()
  content: string;
}
