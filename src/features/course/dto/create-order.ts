import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  courseId: string;

  @IsArray()
  preferredPaymentMethod:
    | ['domestic_card', 'account']
    | ['zalopay_wallet']
    | ['vietqr']
    | ['international_card']
    | ['applepay'];

  @IsString()
  @IsOptional()
  bankCode: string;
}
