import { IsObject, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsObject()
  question: {
    content: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD?: string;
  };
  @IsString()
  correctAnswer: string;

  @IsString()
  topicId: string;

  @IsString()
  explaination: string;

  @IsString()
  audioUrl: string;

  @IsString()
  imageUrl: string;
}
