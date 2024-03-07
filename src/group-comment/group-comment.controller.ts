import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { GroupCommentService } from './group-comment.service';
@Controller('group-comments')
export class GroupCommentController {
  private readonly logger = new Logger(GroupCommentController.name);
  constructor(private readonly commentService: GroupCommentService) {}

  @Post()
  async create(
    @Headers('x-user-id') userId,
    @Headers('x-post-id') postId,
    @Body() createComment,
  ) {
    this.logger.log('create');

    return {
      statusCode: HttpStatus.OK,
      data: await this.commentService.create(userId, postId, createComment),
      message: `Created comment successfully`,
    };
  }

  @Get()
  async findAll(@Headers('x-group-id') groupId) {
    this.logger.log('findAll');

    return {
      statusCode: HttpStatus.OK,
      data: await this.commentService.findAllByGroupId(groupId),
      message: `Comments found`,
    };
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   this.logger.log('findOne');
  //   return {
  //     statusCode: HttpStatus.OK,
  //     data: await this.commentService.findOne(id),
  //     message: `Group found with id ${id}`,
  //   };
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCommentDto: Comment) {
  //   this.logger.log('update');
  //   return this.commentService.update(+id, updateCommentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   this.logger.log('remove');
  //   return this.commentService.remove(+id);
  // }
}
