import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { UserProgressModule } from 'src/user-progress/user-progress.module';
import { UserProgressService } from 'src/user-progress/user-progress.service';

@Module({
  imports: [UserProgressModule],
  controllers: [CourseController],
  providers: [CourseService, UserProgressService],
})
export class CourseModule {}
