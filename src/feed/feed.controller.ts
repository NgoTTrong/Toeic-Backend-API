import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { GetUser, Public } from 'src/core/decorators';
import { Payload } from 'src/core/type/jwt.payload';
import { LikeFeedDto } from './dto/like-feed.dto';
import { LikeCommentFeedDto } from './dto/like-comment-feed.dto';
import { CommentFeedDto } from './dto/comment-feed.dto';
import { ReplyCommentFeedDto } from './dto/reply-comment-feed.dto';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Post()
  create(@Body() createFeedDto: CreateFeedDto) {
    return this.feedService.create(createFeedDto);
  }

  @Get()
  @Public()
  findAll(
    @Query('active') active = 'ACTIVE',
    @Query('skip') skip = '0',
    @Query('take') take = '10',
  ) {
    const filter = active
      ? {
          active,
        }
      : {};
    return this.feedService.findAll(filter, +skip, +take);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.feedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedDto: UpdateFeedDto) {
    return this.feedService.update(+id, updateFeedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedService.remove(+id);
  }

  @Post('like-or-unlike-feed')
  likeOrUnlikeFeed(@GetUser() user: Payload, @Body() likeFeedDto: LikeFeedDto) {
    if (+likeFeedDto.feedId) {
      return this.feedService.likeOrUnlikeFeed(+user.id, +likeFeedDto.feedId);
    }
    throw new BadRequestException("Feed Id isn't valid");
  }
  @Post('like-or-unlike-comment-feed')
  likeOrUnlikeCommentFeed(
    @GetUser() user: Payload,
    @Body() likeCommentFeedDto: LikeCommentFeedDto,
  ) {
    if (+likeCommentFeedDto.commentId) {
      return this.feedService.likeOrUnlikeCommentFeed(
        +user.id,
        +likeCommentFeedDto.commentId,
      );
    }
    throw new BadRequestException("Feed Id isn't valid");
  }
  @Post('comment-feed')
  commentFeed(
    @GetUser() user: Payload,
    @Body() commentFeedDto: CommentFeedDto,
  ) {
    return this.feedService.commentFeed(
      +user.id,
      +commentFeedDto.feedId,
      commentFeedDto.content,
    );
  }
  @Post('reply-comment-feed')
  replyCommentFeed(
    @GetUser() user: Payload,
    @Body() replyCommentFeedDto: ReplyCommentFeedDto,
  ) {
    return this.feedService.replyCommentFeed(
      +user.id,
      +replyCommentFeedDto.feedId,
      +replyCommentFeedDto.commentId,
      replyCommentFeedDto.content,
    );
  }
}
