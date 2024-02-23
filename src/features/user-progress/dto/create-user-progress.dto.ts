import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserProgressDto {
  @IsBoolean()
  @IsOptional()
  isCompleted: boolean;

  @IsString()
  chapterId: string;
}
