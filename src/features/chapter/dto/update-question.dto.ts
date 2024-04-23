import { Answer } from '@prisma/client';

export class UpdateQuestionDto {
  audioUrl?: string;
  imageUrl?: string;
  question?: {
    id: string;
    content?: string;
    optionA?: string;
    optionB?: string;
    optionC?: string;
    optionD?: string;
    topicId?: string;
    explain?: string;
    answer?: Answer;
  };
}
