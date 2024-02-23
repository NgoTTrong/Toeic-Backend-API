import { IsNumber, IsString } from 'class-validator';

export class UserPaymentDto {
  @IsString()
  courseId: string;
}
