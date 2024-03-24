import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GroupService } from './group.service';
import { GetUser, Public } from 'src/core/decorators';
import { Payload } from 'src/core/type/jwt.payload';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupMemberStatus } from '@prisma/client';
import { ReplyCommentPostDto } from './dto/reply-comment';
import { CommentPostDto } from './dto/comment-post';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  @Public()
  getAll() {
    return this.groupService.getAll();
  }

  @Post()
  createGroup(@GetUser() user: Payload, @Body() dto: CreateGroupDto) {
    return this.groupService.createGroup(user?.id, dto);
  }
  @Get('/join/:groupId')
  joinGroup(
    @GetUser() user: Payload,
    @Param('groupId') groupId: string,
    @Query('password') password: string,
  ) {
    return this.groupService.joinGroup(user?.id, groupId, password);
  }
  @Get('/browse/:groupMemberId')
  @Public()
  browseMember(
    @Query('status') status: GroupMemberStatus,
    @Param('groupMemberId') groupMemberId: string,
  ) {
    return this.groupService.browseMember(groupMemberId, status);
  }
  @Post('/post/reply/:postId')
  replyComment(
    @Param('postId') postId: string,
    @Body() dto: ReplyCommentPostDto,
    @GetUser() user: Payload,
  ) {
    return this.groupService.replyComment(
      user?.id,
      postId,
      dto?.commentId,
      dto?.message,
    );
  }
  @Get('/post/reply/:commentId')
  @Public()
  getAllReplyComments(@Param('commentId') commentId: string) {
    return this.groupService.getAllReplyCommentPost(commentId);
  }
  @Post('/post/:postId')
  CommentPost(
    @Param('postId') postId: string,
    @Body() dto: CommentPostDto,
    @GetUser() user: Payload,
  ) {
    return this.groupService.commentPost(user?.id, postId, dto?.message);
  }
  @Get('/post/:postId')
  @Public()
  getAllComment(@Param('postId') postId: string) {
    return this.groupService.getAllCommentPost(postId);
  }
  @Post('/:groupId/post')
  createPost(
    @Param('groupId') groupId: string,
    @Body() dto: CreateGroupDto,
    @GetUser() user: Payload,
  ) {
    return this.groupService.createPost(user?.id, groupId, dto);
  }
  @Get('/:groupId/post')
  @Public()
  getAllPost(@Param('groupId') groupId: string) {
    return this.groupService.getAllPost(groupId);
  }
  @Get(':id')
  @Public()
  getById(@Param('id') id: string) {
    return this.groupService.getById(id);
  }
}
