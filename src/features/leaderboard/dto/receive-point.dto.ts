import { IsNumber } from 'class-validator';

export class ReceivePointDto {
  @IsNumber()
  point: number;
}
