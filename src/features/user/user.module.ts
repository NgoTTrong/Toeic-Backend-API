import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import supabaseClientProvider from 'src/supabase/supabase.provider';

@Module({
  controllers: [UserController],
  providers: [UserService, supabaseClientProvider],
})
export class UserModule {}
