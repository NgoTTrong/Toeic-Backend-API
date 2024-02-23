import { Answer } from '@prisma/client';
import { IsArray, IsString } from 'class-validator';

export class CreatePart5Dto {
  @IsString()
  thumbnail: string;
  @IsString()
  introduction: string;
  @IsArray()
  questions: {
    question: {
      content: string;
      optionA: string;
      optionB: string;
      optionC: string;
      optionD?: string;
    };
    topicId?: string;
    explain?: {
      explain: string;
      images: string[];
      answer: Answer;
    };
  }[];
}
