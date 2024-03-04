import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UserService } from 'src/features/user/user.service';
import supabaseClientProvider from 'src/supabase/supabase.provider';

@Module({
  controllers: [PostController],
  providers: [PostService, UserService, supabaseClientProvider],
})
export class PostModule {}
