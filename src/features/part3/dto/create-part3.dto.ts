import { Answer } from '@prisma/client';
import { IsArray, IsString } from 'class-validator';

export class CreatePart3Dto {
  @IsString()
  thumbnail: string;
  @IsString()
  introduction: string;
  @IsArray()
  questions: {
    audioUrl: string;
    imageUrls: string[];
    questions: {
      content: string;
      optionA: string;
      optionB: string;
      optionC: string;
      optionD?: string;
    }[];
    topicId?: string;
    explain?: {
      explain: string;
      images: string[];
      answer: Answer;
    };
  }[];
}
