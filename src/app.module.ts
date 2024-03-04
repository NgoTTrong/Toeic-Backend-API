import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { environments } from './environments';
import { join } from 'path';
import { GroupCommentModule } from './group-comment/group-comment.module';
import { PostModule } from './post/post.module';
import { GroupModule } from './group/group.module';
import supabaseClientProvider from './supabase/supabase.provider';

import { FeaturesModule } from './features/features.module';
import { ChatbotModule } from './features/chatbot/chatbot.module';
@Module({
  imports: [
    PrismaModule,
    AuthModule,
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
    FeaturesModule,
    ChatbotModule,
    GroupCommentModule,
    PostModule,
    GroupModule,
  ],
  controllers: [AppController],
  providers: [AppService, supabaseClientProvider],
})
export class AppModule {}
