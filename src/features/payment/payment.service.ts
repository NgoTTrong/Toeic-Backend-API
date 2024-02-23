import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Course } from '@prisma/client';
type Purchase = Course & { total: number };
@Injectable()
export class PaymentService {
  constructor(private readonly prismaService: PrismaService) {}
  findUserPaymentCourse(courseId: string, userId: string) {
    return this.prismaService.payment.findFirst({
      where: {
        courseId,
        userId,
      },
    });
  }
  purchaseCourse(courseId: string, userId: string) {
    return this.prismaService.payment.create({
      data: {
        courseId,
        userId,
      },
    });
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
