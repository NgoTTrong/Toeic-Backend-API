import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { UserPaymentDto } from './dto/user-payment.dto';
import { GetUser, Public } from 'src/core/decorators';
import { Payload } from 'src/core/type/jwt.payload';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('user-payment-course')
  getUserPaymentCourse(@Body() dto: UserPaymentDto, @GetUser() user: Payload) {
    return this.paymentService.findUserPaymentCourse(dto.courseId, user.id);
  }
  @Post('purchase')
  purchaseCourse(@Body() dto: UserPaymentDto, @GetUser() user: Payload) {
    return this.paymentService.purchaseCourse(dto.courseId, user.id);
  }
  @Get('/analytics')
  getAnalytics(@GetUser() user: Payload) {
    return this.paymentService.getAnalytics(user.id);
  }
}
