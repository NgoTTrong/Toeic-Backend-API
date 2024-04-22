import { Answer } from '@prisma/client';

export class AddQuestionDto {
  audioUrl: string;
  imageUrl: string;
  question: {
    content: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD?: string;
    topicId?: string;
    explain?: string;
    answer: Answer;
  };
}
