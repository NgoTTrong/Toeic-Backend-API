
import { IsOptional, IsString } from 'class-validator';

export class CreatePart7Dto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  thumbnail: string;

  @IsString()
  @IsOptional()
  introduction: string;
}
