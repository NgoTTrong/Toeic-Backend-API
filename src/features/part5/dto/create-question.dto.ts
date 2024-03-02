import { IsObject, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsObject()
  question: {
    content: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD?: string;
    answer: string;
    topicId: string;
    explain: string;
  };

}
