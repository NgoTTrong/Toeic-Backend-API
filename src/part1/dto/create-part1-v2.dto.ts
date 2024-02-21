import { IsOptional, IsString } from 'class-validator';

export class CreatePart1V2Dto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  thumbnail: string;

  @IsString()
  @IsOptional()
  introduction: string;
}
