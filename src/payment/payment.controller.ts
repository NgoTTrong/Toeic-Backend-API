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
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { UserPaymentDto } from './dto/user-payment.dto';
import { Public } from 'src/core/decorators';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('user-payment-course')
  @Public()
  getUserPaymentCourse(@Body() dto: UserPaymentDto) {
    return this.paymentService.findUserPaymentCourse(dto.courseId, dto.userId);
  }
  @Post('purchase')
  @Public()
  purchaseCourse(@Body() dto: UserPaymentDto) {
    return this.paymentService.purchaseCourse(dto.courseId, dto.userId);
  }

  @Get('/analytics')
  @Public()
  getAnalytics() {
    return this.paymentService.getAnalytics(1);
  }
}
