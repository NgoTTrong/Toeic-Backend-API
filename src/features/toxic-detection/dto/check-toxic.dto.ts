import { IsString } from 'class-validator';

export class CheckToxicDto {
  @IsString()
  text: string;
}
