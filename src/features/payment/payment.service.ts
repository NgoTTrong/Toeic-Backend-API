import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Course } from '@prisma/client';
import * as dayjs from 'dayjs';
import * as CryptoJS from 'crypto-js';
import { environments } from 'src/environments';
import axios from 'axios';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
type Purchase = Course & { total: number };
@Injectable()
export class PaymentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
  ) {}
  findUserPaymentCourse(courseId: string, userId: string) {
    return this.prismaService.payment.findFirst({
      where: {
        courseId,
        userId,
      },
    });
  }
  async purchaseCourse(courseId: string, userId: string) {
    let payment = await this.prismaService.payment.findFirst({
      where: {
        courseId,
        userId,
      },
      include: {
        course: true,
      },
    });
    if (!payment) {
      payment = await this.prismaService.payment.create({
        data: {
          courseId,
          userId,
        },
        include: {
          course: true,
        },
      });
    }
    const zaloOrder = this.createZaloPaySesstion(
      payment?.id,
      ['zalopay_wallet'],
      [
        {
          title: payment?.course?.title,
          quantity: 1,
          price: payment?.course?.price,
        },
      ],
      payment?.course?.price,
      '',
    );
    return {
      zaloOrder,
      payment,
    };
  }

  generateTransId(paymentId: string) {
    return `${dayjs().format('YYMMDD')}` + '_' + paymentId;
  }

  async createZaloPaySesstion(
    paymentId: string,
    preferredPaymentMethod: string[],
    items: object[],
    amount: number,
    bankCode: string,
  ) {
    const transId = this.generateTransId(paymentId).slice(0, 40);

    const payment = await this.prismaService.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        transactionId: transId,
      },
      include: {
        user: true,
      },
    });
    const order = {
      app_id: Number(environments.zalopayAppId),
      app_trans_id: transId, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
      app_user: payment?.user?.name ?? 'tester',
      app_time: Date.now(), // miliseconds
      item: JSON.stringify(items),
      embed_data: JSON.stringify({
        preferred_payment_method: preferredPaymentMethod,
        redirecturl: 'https://toeic-mastery-rho.vercel.app/',
      }),
      amount: amount,
      callback_url:
        'https://toeic-backend-api.onrender.com/course/callback-payment',
      description: `Toeic Mastery - Payment for the order #${transId}`,
      bank_code: bankCode ?? '',
      mac: '',
    };

    const data =
      order.app_id +
      '|' +
      order.app_trans_id +
      '|' +
      order.app_user +
      '|' +
      order.amount +
      '|' +
      order.app_time +
      '|' +
      order.embed_data +
      '|' +
      order.item;
    order.mac = CryptoJS.HmacSHA256(data, environments.zalopayKey1).toString();
    console.log(order);

    const resZaloPay = await firstValueFrom(
      this.httpService.post(environments.zalopayUrl + '/create', null, {
        params: order,
      }),
    );
    return resZaloPay?.data as {
      return_code: 1 | 2;
      return_message?: string;
      sub_return_code?: string;
      sub_return_message?: string;
      order_url?: string;
      qr_code?: string;
    };
  }
  async getAnalytics(userId: string) {
    const payments = await this.prismaService.payment.findMany({
      include: { course: true },
      where: {
        course: {
          userId: userId,
        },
      },
    });
    const groupByCourses: { [courseTitle: string]: number } = {};
    for (let payment of payments) {
      if (groupByCourses[payment.course.title]) {
        groupByCourses[payment.course.title] =
          groupByCourses[payment.course.title] + payment.course.price;
      } else {
        groupByCourses[payment.course.title] = payment.course.price;
      }
    }
    const data = Object.entries(groupByCourses).map(([courseTitle, total]) => ({
      title: courseTitle,
      total: total,
    }));
    return {
      data,
      totalSales: data?.length,
      totalRevenue: data.reduce((total, payment) => total + payment.total, 0),
    };
  }
}
