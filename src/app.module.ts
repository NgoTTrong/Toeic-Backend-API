import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { environments } from './environments';
import { join } from 'path';
import { FeedModule } from './feed/feed.module';
import { CategoryFeedModule } from './category-feed/category-feed.module';
import { ExamModule } from './exam/exam.module';
import { Part1Module } from './part1/part1.module';
import { Part2Module } from './part2/part2.module';
import { Part3Module } from './part3/part3.module';
import { Part4Module } from './part4/part4.module';
import { Part5Module } from './part5/part5.module';
import { Part6Module } from './part6/part6.module';
import { Part7Module } from './part7/part7.module';
import { CourseModule } from './course/course.module';
import { CategoryCourseModule } from './category-course/category-course.module';
import { ChapterModule } from './chapter/chapter.module';
import { UserProgressModule } from './user-progress/user-progress.module';
import { PaymentModule } from './payment/payment.module';
@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    MailerModule.forRoot({
      transport: environments.transport,
      defaults: {
        from: 'Toeic Mastery',
      },
      template: {
        dir: join(__dirname, '/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    FeedModule,
    CategoryFeedModule,
    ExamModule,
    Part1Module,
    Part2Module,
    Part3Module,
    Part4Module,
    Part5Module,
    Part6Module,
    Part7Module,
    CourseModule,
    CategoryCourseModule,
    ChapterModule,
    UserProgressModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
