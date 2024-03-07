import { Client } from 'pg';
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { UserService } from 'src/features/user/user.service';
import { IPost } from './dto/post-interface';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);
  constructor(
    private userService: UserService,
    @Inject('SUPABASE_CLIENT') private readonly supabaseClient: Client,
  ) {}
  async create(userId, groupId, newPost): Promise<IPost> {
    this.logger.log('create');
    const { content } = newPost;

    const query =
      'INSERT INTO group_posts(user_id,group_id,content) VALUES($1, $2, $3) RETURNING *';
    const result = await this.supabaseClient.query(query, [
      userId,
      groupId,
      content,
    ]);

    return result.rows[0];
  }

  async findAll(groupId: string): Promise<IPost[]> {
    this.logger.log('findAll');

    const query = `
    SELECT gp.id AS post_id, gp.created_at, gp.content, gp.group_id,
           u.name AS user_name 
    FROM group_posts gp 
    JOIN users u ON gp.user_id = u.id 
    WHERE gp.group_id = $1
  `;

    // const result = await this.supabaseClient.query(query, [groupId]);
    const result = await this.supabaseClient.query(query, [groupId]);

    return result.rows;
  }

  async findOne(id: string): Promise<IPost> {
    this.logger.log('findOne');
    const query = 'SELECT * FROM group_posts WHERE id = $1';

    const result = await this.supabaseClient.query(query, [id]);
    if (result.rows.length === 0) {
      throw new BadRequestException('Group not found with id ' + id);
    }
    return result.rows[0];
  }

  // update(id, updatePost: any): string {
  //   this.logger.log('update');
  //   return `This action updates a #${id} post`;
  // }

  // remove(id): string {
  //   this.logger.log('remove');
  //   return `This action removes a #${id} post`;
  // }
}
