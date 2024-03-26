import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FeedModule } from './feed/feed.module';
import { ExamModule } from './exam/exam.module';
import { Part1Module } from './part1/part1.module';
import { Part2Module } from './part2/part2.module';
import { Part3Module } from './part3/part3.module';
import { Part4Module } from './part4/part4.module';
import { Part5Module } from './part5/part5.module';
import { Part6Module } from './part6/part6.module';
import { Part7Module } from './part7/part7.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { CourseModule } from './course/course.module';
import { ChapterModule } from './chapter/chapter.module';
import { UserProgressModule } from './user-progress/user-progress.module';
import { FeedCategoryModule } from './feed-category/feed-category.module';
import { CourseCategoryModule } from './course-category/course-category.module';
import { TopicModule } from './topic/topic.module';
import { PaymentModule } from './payment/payment.module';
import { ExamCategoryModule } from './exam-category/exam-category.module';
import { FlashCardModule } from './flashcard/flashcard.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [
    PaymentModule,
    UserModule,
    TopicModule,
    CourseCategoryModule,
    FeedModule,
    ExamModule,
    Part1Module,
    Part2Module,
    Part3Module,
    Part4Module,
    Part5Module,
    Part6Module,
    Part7Module,
    ChatbotModule,
    CourseModule,
    ChapterModule,
    UserProgressModule,
    FeedCategoryModule,
    ExamCategoryModule,
    FlashCardModule,
    GroupModule,
    ChatbotModule,
  ],
  controllers: [],
  providers: [],
})
export class FeaturesModule {}
