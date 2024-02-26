import { Answer } from '@prisma/client';
import { IsArray, IsString } from 'class-validator';

export class CreatePart2Dto {
  @IsString()
  thumbnail: string;
  @IsString()
  introduction: string;
  @IsArray()
  questions: {
    audioUrl: string;
    question: {
      content: string;
      optionA: string;
      optionB: string;
      optionC: string;
    };
    topicId?: string;
    explain?: {
      explain: string;
      images: string[];
      answer: Answer;
    };
  }[];
}
