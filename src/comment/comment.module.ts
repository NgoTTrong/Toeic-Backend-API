import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TransformerService } from 'src/transformerService/transformer.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService, TransformerService],
})
export class CommentModule {}
