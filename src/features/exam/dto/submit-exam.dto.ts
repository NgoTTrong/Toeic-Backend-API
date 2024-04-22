import { IsArray, IsNumber } from 'class-validator';

export class SubmitExamDto {
  @IsArray()
  result: {
    questionId: string;
    option: 'A' | 'B' | 'C' | 'D';
  }[];
  @IsNumber()
  time: number;
}
