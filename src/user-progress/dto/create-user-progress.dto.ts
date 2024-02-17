import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateUserProgressDto {
  @IsBoolean()
  @IsOptional()
  isCompleted: boolean;

  @IsNumber()
  chapterId: number;

  @IsNumber()
  userId: number;
}
