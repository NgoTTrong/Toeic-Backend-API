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
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('group')
export class GroupController {
  private readonly logger = new Logger(GroupController.name);
  constructor(private readonly groupService: GroupService) {}

  @Post()
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
  async findAll() {
    this.logger.log('findAll');
    return {
      statusCode: HttpStatus.OK,
      data: await this.groupService.findAll(),
      message: `Groups found`,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log('findOne');
    return {
      statusCode: HttpStatus.OK,
      data: await this.groupService.findOne(id),
      message: `Group found with id ${id}`,
    };
  }

  @Patch(':id')
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
  async remove(@Param('id') id: string) {
    this.logger.log('remove');
    return {
      statusCode: HttpStatus.OK,
      data: await this.groupService.remove(id),
      message: `Deleted group successfully with id ${id}`,
    };
  }
}
