import { IsString } from 'class-validator';

export class UpdateTopicDto {
  @IsString()
  name: string;
}
