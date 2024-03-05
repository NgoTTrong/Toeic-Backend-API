import { Module } from '@nestjs/common';
import { TransformerService } from 'src/transformerService/transformer.service';
import supabaseClientProvider from 'src/supabase/supabase.provider';
import { GroupCommentController } from './group-comment.controller';
import { GroupCommentService } from './group-comment.service';
import { UserService } from 'src/features/user/user.service';

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
