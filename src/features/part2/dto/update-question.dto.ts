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
    answer?: string;
    explain?: string;
    topicId?: string;
  };

  @IsString()
  @IsOptional()
  audioUrl: string;
}
