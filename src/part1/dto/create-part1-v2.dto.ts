import { IsString } from 'class-validator';

export class CreatePart1V2Dto {
  @IsString()
  title: string;
}
