import { Answer } from '@prisma/client';
import { IsArray, IsString } from 'class-validator';

export class CreatePart6Dto {
  @IsString()
  thumbnail: string;
  @IsString()
  introduction: string;
  @IsArray()
  questions: {
    imageUrls: string[];
    questions: {
      content: string;
      optionA: string;
      optionB: string;
      optionC: string;
      optionD?: string;
    }[];
    topicId?: number;
    explain?: {
      explain: string;
      images: string[];
      answer: Answer;
    };
  }[];
}
