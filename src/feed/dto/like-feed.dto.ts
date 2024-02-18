import { IsNumber, IsString } from 'class-validator';

export class LikeFeedDto {
  @IsString()
  feedId: string;
}
