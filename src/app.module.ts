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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
