import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateQuestionDto {
  @IsArray()
  questions: {
    content: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD?: string;
    answer: string;
    explain: string;
    topicId: string;
  }[];

  @IsString()
  @IsOptional()
  imageUrl: string;

}
