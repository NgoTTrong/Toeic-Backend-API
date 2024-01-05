import { Answer } from '@prisma/client';
import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class CreatePart1Dto {
  @IsString()
  thumbnail: string;
  @IsString()
  introduction: string;
  @IsArray()
  questions: {
    audioUrl: string;
    imageUrls: string[];
    question: {
      content: string;
      optionA: string;
      optionB: string;
      optionC: string;
      optionD?: string;
    };
    topicId?: number;
    explain?: {
      explain: string;
      images: string[];
      answer: Answer;
    };
  }[];
}
