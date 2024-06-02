import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { UserProgressModule } from '../user-progress/user-progress.module';
import { UserProgressService } from '../user-progress/user-progress.service';
import { SocketModule } from 'src/core/socket/socket.module';

@Module({
  imports: [UserProgressModule, SocketModule],
  controllers: [CourseController],
  providers: [CourseService, UserProgressService],
})
export class CourseModule {}
