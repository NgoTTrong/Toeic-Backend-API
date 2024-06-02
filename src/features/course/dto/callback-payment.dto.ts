import { IsNumber, IsString } from 'class-validator';

export class CallbackPaymentDto {
  @IsString()
  data: string;
  @IsString()
  mac: string;
  @IsNumber()
  type: number;
}
