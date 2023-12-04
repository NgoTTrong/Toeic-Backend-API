import { IsNumber } from 'class-validator';

export class LikeFeedDto {
  @IsNumber()
  feedId: number;
}
