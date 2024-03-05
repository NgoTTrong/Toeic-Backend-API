import { PartialType } from '@nestjs/mapped-types';
import { CreateExamDto } from './create-exam.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateExamDto extends PartialType(CreateExamDto) {
  @IsString()
  @IsOptional()
  introduction: string;

  @IsString()
  @IsOptional()
  thumbnail: string;

  @IsString()
  @IsOptional()
  part1Id: string;

  @IsString()
  @IsOptional()
  part2Id: string;

  @IsString()
  @IsOptional()
  part3Id: string;

  @IsString()
  @IsOptional()
  part4Id: string;

  @IsString()
  @IsOptional()
  part5Id: string;

  @IsString()
  @IsOptional()
  part6Id: string;

  @IsString()
  @IsOptional()
  part7Id: string;
}
