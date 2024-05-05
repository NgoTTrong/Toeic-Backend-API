import { Module } from '@nestjs/common';
import { PracticeCourseService } from './practice-course.service';
import { PracticeCourseController } from './practice-course.controller';

@Module({
  controllers: [PracticeCourseController],
  providers: [PracticeCourseService],
})
export class PracticeCourseModule {}
