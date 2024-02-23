import { IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateQuestionDto {
  @IsObject()
  @IsOptional()
  question: {
    id: string;
    content?: string;
    optionA?: string;
    optionB?: string;
    optionC?: string;
    optionD?: string;
  };
  @IsObject()
  @IsOptional()
  explain: {
    id: string;
    correctAnswer?: string;
    explaination?: string;
  };

  @IsString()
  @IsOptional()
  topicId: string;

  @IsString()
  @IsOptional()
  audioUrl: string;

  @IsString()
  @IsOptional()
  imageUrl: string;
}
