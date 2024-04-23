import { Answer } from '@prisma/client';

export class AnswerQuestion {
  questionId: string;
  answer: Answer;
}
