import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Client } from 'pg';
import { TransformerService } from 'src/features/transformerService/transformer.service';
import { UserService } from 'src/features/user/user.service';
import { IComment } from './dto/comment-interface';

@Injectable()
export class GroupCommentService {
  constructor(
    private readonly transformersService: TransformerService,
    private userService: UserService,
    @Inject('SUPABASE_CLIENT') private readonly supabaseClient: Client,
  ) {}
  private readonly logger = new Logger(GroupCommentService.name);

  async create(userId, postId, newComment): Promise<IComment> {
    this.logger.log('create');
    const { message, commentParentId, group_id } = newComment;
    let level = newComment.level;
    const label = await this.transformersService.classifyText(message);
    if (label === 'NEG') {
      throw new BadRequestException('Comment content is considered negative');
    }
    let query;
    let result;
    if (!commentParentId) {
      level = 1;
      query =
        'INSERT INTO group_comments(user_id, post_id, level,message,group_id) VALUES($1, $2, $3,$4,$5) RETURNING *';
      result = await this.supabaseClient.query(query, [
        userId,
        postId,
        level,
        message,
        group_id,
      ]);
    } else {
      const parentComment = await this.findOne(commentParentId, level);
      level = parseInt(parentComment.level as string, 10) + 1;
      query =
        'INSERT INTO group_comments(id,user_id, post_id, level,message,group_id) VALUES($1, $2, $3,$4,$5,$6) RETURNING *';
      result = await this.supabaseClient.query(query, [
        commentParentId,
        userId,
        postId,
        level,
        message,
        group_id,
      ]);
    }
    return result.rows[0];
  }

  groupedComments(comments) {
    return comments.reduce((acc, comment) => {
      const postId = comment.post_id;
      if (!acc[postId]) {
        acc[postId] = [];
      }
      acc[postId].push(comment);
      return acc;
    }, {});
  }

  async findAllByGroupId(groupId): Promise<IComment[]> {
    this.logger.log('findAllByGroupId', groupId);
    // const query = 'SELECT * FROM group_comments';
    const query = `
    SELECT gc.id AS comment_id, gc.created_at, gc.level, gc.message, gc.post_id, gc.group_id, u.name AS user_name
    FROM group_comments AS gc
    LEFT JOIN users AS u ON u.id = gc.user_id
    WHERE gc.group_id = $1
  `;

    const result = await this.supabaseClient.query(query, [groupId]);

    return this.groupedComments(result.rows);
  }

  async findAllByPostId(postId) {
    this.logger.log('findAllByPostId');
    // const query = 'SELECT * FROM group_comments';
    const query = `
      SELECT gc.id AS comment_id, gc.post_id, gc.level, gc.content, u.name AS user_name
      FROM group_comments AS gc
      JOIN users u ON gc.user_id = u.id
      WHERE gc.post_id = $1
`;

    const result = await this.supabaseClient.query(query, [postId]);

    return {
      statusCode: HttpStatus.OK,
      data: result.rows,
      message: `Comments found`,
    };
  }

  async findOne(id, level) {
    this.logger.log('findOne');
    const query = 'SELECT * FROM group_comments WHERE id = $1 and level=$2';

    const result = await this.supabaseClient.query(query, [id, level]);
    if (result.rows.length === 0) {
      throw new BadRequestException('Comment not found with id ' + id);
    }

    return result.rows[0];
  }

  // async update(id, updatedComment) {
  //   this.logger.log('update');
  //   const existingGroup = await this.findOne(id);

  //   if (!existingGroup) {
  //     throw new BadRequestException(`Comment not found with id: ${id}`);
  //   }

  //   const { content } = updatedComment;
  //   const label = await this.transformersService.classifyText(content);
  //   if (label === 'NEG') {
  //     throw new BadRequestException('Comment content is considered negative');
  //   }

  //   const query = `
  //   UPDATE group_comments
  //   SET content = $1
  //   WHERE id = $2
  //   RETURNING *
  // `;
  //   const result = await this.supabaseClient.query(query, [content, id]);
  //   return {
  //     statusCode: HttpStatus.OK,
  //     data: result.rows[0],
  //     message: `Updated comment successfully with id ${id}`,
  //   };
  // }

  // async remove(id) {
  //   this.logger.log('remove');
  //   const query = 'DELETE FROM group_comments WHERE id = $1 RETURNING *';

  //   const result = await this.supabaseClient.query(query, [id]);
  //   if (result.rows.length == 0) {
  //     throw new BadRequestException(`Comment not found with id: ${id}`);
  //   }
  //   return {
  //     statusCode: HttpStatus.OK,
  //     data: result.rows[0],
  //     message: `Deleted comment successfully with id ${id}`,
  //   };
  // }
}
