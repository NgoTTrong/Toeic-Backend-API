import { Module } from '@nestjs/common';
import supabaseClientProvider from 'src/supabase/supabase.provider';
import { GroupCommentController } from './group-comment.controller';
import { GroupCommentService } from './group-comment.service';
import { UserService } from 'src/features/user/user.service';
import { TransformerService } from 'src/features/transformerService/transformer.service';

@Module({
  controllers: [GroupCommentController],
  providers: [
    GroupCommentService,
    TransformerService,
    supabaseClientProvider,
    UserService,
  ],
})
export class GroupCommentModule {}
