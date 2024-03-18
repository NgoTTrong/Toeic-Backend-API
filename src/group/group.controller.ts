import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Headers,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Public } from 'src/core/decorators';

@Controller('group')
export class GroupController {
  private readonly logger = new Logger(GroupController.name);
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @Public()
  create(
    @Headers('x-user-id') userId: string,
    @Body() createGroupDto: CreateGroupDto,
  ) {
    this.logger.log('create');
    return {
      statusCode: HttpStatus.OK,
      data: this.groupService.create(userId, createGroupDto),
      message: `Created group successfully`,
    };
  }

  @Get()
  @Public()
  async findAll() {
    this.logger.log('findAll');
    return {
      statusCode: HttpStatus.OK,
      data: await this.groupService.findAll(),
      message: `Groups found`,
    };
  }

  @Get('/me')
  @Public()
  async findAllByMe(@Headers('x-user-id') userId) {
    this.logger.log('findAllByMe');

    return {
      statusCode: HttpStatus.OK,
      data: await this.groupService.findAllByMe(userId),
      message: `Groups found`,
    };
  }

  @Get('/search')
  @Public()
  async search(@Query('key') searchTerm: string): Promise<any> {
    this.logger.log('search');

    return {
      statusCode: HttpStatus.OK,
      data: await this.groupService.searchByTerm(searchTerm),
      message: `Groups found`,
    };
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    this.logger.log('findOne');
    return {
      statusCode: HttpStatus.OK,
      data: await this.groupService.findOne(id),
      message: `Group found with id ${id}`,
    };
  }

  @Patch(':id/join')
  @Public()
  async joinGroup(
    @Headers('x-group-password') password,
    @Param('id') id: string,
    @Body() body: { member_id: string },
  ): Promise<any> {
    this.logger.log('joinGroup');
    return {
      statusCode: HttpStatus.OK,
      data: await this.groupService.joinGroup(id, body.member_id, password),
      message: `Updated successfully with id ${id}`,
    };
  }
  @Patch(':id/approve')
  @Public()
  async approve(
    @Param('id') id: string,
    @Body() body: { candidate_waiting },
  ): Promise<any> {
    this.logger.log('approve');
    return {
      statusCode: HttpStatus.OK,
      data: await this.groupService.approve(id, body.candidate_waiting),
      message: `Approved successfully with id ${id}`,
    };
  }

  @Patch(':id/reject')
  @Public()
  async reject(
    @Param('id') id: string,
    @Body() body: { candidate_waiting },
  ): Promise<any> {
    this.logger.log('reject');
    return {
      statusCode: HttpStatus.OK,
      data: await this.groupService.reject(id, body.candidate_waiting),
      message: `Rejected successfully with id ${id}`,
    };
  }

  @Patch(':id/out')
  @Public()
  async outGroup(
    @Param('id') id: string,
    @Body() body: { member_id: string },
  ): Promise<any> {
    this.logger.log('outGroup');
    return {
      statusCode: HttpStatus.OK,
      data: await this.groupService.outGroup(id, body.member_id),
      message: `Updated successfully with id ${id}`,
    };
  }

  @Patch(':id')
  @Public()
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    this.logger.log('update');
    return {
      statusCode: HttpStatus.OK,
      data: await this.groupService.update(id, updateGroupDto),
      message: `Updated group successfully with id ${id}`,
    };
  }

  @Delete(':id')
  @Public()
  async remove(@Param('id') id: string) {
    this.logger.log('remove');
    return {
      statusCode: HttpStatus.OK,
      data: await this.groupService.remove(id),
      message: `Deleted group successfully with id ${id}`,
    };
  }
}
