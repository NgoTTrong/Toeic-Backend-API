import { Module } from '@nestjs/common';
import { ExamCategoryService } from './exam-category.service';
import { ExamCategoryController } from './exam-category.controller';

@Module({
  controllers: [ExamCategoryController],
  providers: [ExamCategoryService],
})
export class ExamCategoryModule {}
