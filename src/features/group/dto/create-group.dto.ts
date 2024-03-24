import { IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  image: string;
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  @IsOptional()
  password?: string;
}
