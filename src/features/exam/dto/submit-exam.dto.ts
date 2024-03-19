import { IsArray } from 'class-validator';

export class SubmitExamDto {
  @IsArray()
  result: {
    questionId: string;
    option: 'A' | 'B' | 'C' | 'D';
  }[];
}
