import { Inject, Injectable, Logger } from '@nestjs/common';
import { Client } from 'pg';
import { BadRequestException } from '@nestjs/common';
import { UserService } from 'src/features/user/user.service';
import { IGroup } from './dto/group-interface';
@Injectable()
export class GroupService {
  private readonly logger = new Logger(GroupService.name);
  constructor(
    private userService: UserService,
    @Inject('SUPABASE_CLIENT') private readonly supabaseClient: Client,
  ) {}
  ME = 'me';

  async create(userId, newGroup): Promise<IGroup[]> {
    this.logger.log('create');
    const currentUser = await this.userService.getCurrentUserLogin(userId);
    const { title, image, description } = newGroup;
    const members = [currentUser.name];
    const createdBy = currentUser.name;
    const query =
      'INSERT INTO groups(title, image, created_by, members, description,user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    const result = await this.supabaseClient.query(query, [
      title,
      image,
      createdBy,
      members,
      description,
      userId,
    ]);
    return result.rows[0];
  }

  async findAll(): Promise<IGroup[]> {
    this.logger.log('findAll');
    let result;
    try {
      const query = 'SELECT * FROM groups';

      result = await this.supabaseClient.query(query);
    } catch (error) {
      throw error;
    }

    return result.rows;
  }

  async joinGroup(groupId, member_id) {
    this.logger.log('joinGroup');
    const group = await this.findOne(groupId);
    group.member_ids.push(member_id);
    const query = `
    UPDATE groups
    SET member_ids = $1
    WHERE id = $2
    RETURNING *
  `;
    const result = await this.supabaseClient.query(query, [
      group.member_ids,
      groupId,
    ]);
    return result.rows[0];
  }

  async outGroup(groupId, member_id) {
    this.logger.log('outGroup');
    const group = await this.findOne(groupId);
    group.member_ids = group.member_ids.filter((id) => id !== member_id);
    const query = `
    UPDATE groups
    SET member_ids = $1
    WHERE id = $2
    RETURNING *
  `;
    const result = await this.supabaseClient.query(query, [
      group.member_ids,
      groupId,
    ]);
    return result.rows[0];
  }

  async findAllByMe(userId) {
    this.logger.log('findAllByMe');
    const allGroup = await this.findAll();
    const filteredGroups = allGroup.filter((group) => group.user_id === userId);
    return filteredGroups;
  }

  async searchByTerm(searchTerm) {
    this.logger.log('searchByTerm');
    let result;
    try {
      const query = `SELECT * FROM groups WHERE title LIKE '%${searchTerm}%'`;
      result = await this.supabaseClient.query(query);
    } catch (error) {}
    return result.rows;
  }

  async findOne(id: any) {
    this.logger.log('findOne');
    const query = 'SELECT * FROM groups WHERE id = $1';

    const result = await this.supabaseClient.query(query, [id]);
    if (result.rows.length === 0) {
      throw new BadRequestException('Group not found with id ' + id);
    }
    return result.rows[0];
  }

  async update(id: any, updatedGroup) {
    this.logger.log('update');
    const existingGroup = await this.findOne(id);

    if (!existingGroup) {
      throw new BadRequestException(`Group not found with id: ${id}`);
    }

    const { image, title, description } = updatedGroup;

    const query = `
    UPDATE groups 
    SET image = $1, title = $2, description = $3
    WHERE id = $4
    RETURNING *
  `;
    const result = await this.supabaseClient.query(query, [
      image,
      title,
      description,
      id,
    ]);
    return result.rows[0];
  }
  async remove(id: any) {
    this.logger.log('remove');
    const query = 'DELETE FROM groups WHERE id = $1 RETURNING *';

    const result = await this.supabaseClient.query(query, [id]);
    if (result.rows.length == 0) {
      throw new BadRequestException(`Group not found with id: ${id}`);
    }
    return result.rows[0];
  }
}
