import { IsNumber } from 'class-validator';

export class UserPaymentDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  courseId: number;
}
