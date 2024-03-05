import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import supabaseClientProvider from 'src/supabase/supabase.provider';
import { UserService } from 'src/features/user/user.service';

@Module({
  controllers: [GroupController],
  providers: [GroupService, supabaseClientProvider, UserService],
})
export class GroupModule {}
