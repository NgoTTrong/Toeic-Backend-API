import { Module } from '@nestjs/common';
import { CategoryCourseService } from './category-course.service';
import { CategoryCourseController } from './category-course.controller';

@Module({
  controllers: [CategoryCourseController],
  providers: [CategoryCourseService],
})
export class CategoryCourseModule {}
