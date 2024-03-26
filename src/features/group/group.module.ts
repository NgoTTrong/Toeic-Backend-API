import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { UserService } from 'src/features/user/user.service';

@Module({
  controllers: [GroupController],
  providers: [GroupService, UserService],
})
export class GroupModule {}
