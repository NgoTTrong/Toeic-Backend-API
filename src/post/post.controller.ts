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
import { PostService } from './post.service';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  private readonly logger = new Logger(PostController.name);
  constructor(private readonly postService: PostService) {}

  @Post()
  create(
    @Headers('x-user-id') userId: string,
    @Headers('x-post-id') postId: string,
    @Body() newPost,
  ) {
    return {
      statusCode: HttpStatus.OK,
      data: this.postService.create(userId, postId, newPost),
      message: `Created comment successfully`,
    };
  }

  @Get()
  async findAll(@Headers('x-group-id') groupId) {
    this.logger.log('findAll');
    return {
      statusCode: HttpStatus.OK,
      data: await this.postService.findAll(groupId),
      message: `Posts found`,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log('findOne');
    return {
      statusCode: HttpStatus.OK,
      data: await this.postService.findOne(id),
      message: `Post found with id ${id}`,
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
