import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateQuestionDto {
  @IsArray()
  @IsOptional()
  questions: {
    id: string;
    content?: string;
    optionA?: string;
    optionB?: string;
    optionC?: string;
    optionD?: string;
    answer?: string;
    explain?: string;
    topicId?: string;
  }[];

  @IsString()
  @IsOptional()
  audioUrl: string;

  @IsString()
  @IsOptional()
  imageUrl: string;
}
