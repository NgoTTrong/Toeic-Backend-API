import { IsArray } from 'class-validator';

export class CreateTopicDto {
  @IsArray()
  names: string[];
}
