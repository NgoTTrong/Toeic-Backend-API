import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GroupService } from './group.service';
import { GetUser, Public } from 'src/core/decorators';
import { Payload } from 'src/core/type/jwt.payload';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupMemberStatus } from '@prisma/client';

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
  @Get('/join:groupId')
  joinGroup(@GetUser() user: Payload, @Param('groupId') groupId: string) {
    return;
  }
  @Get('/browse/:groupMemberId')
  browseMember(
    @Query('status') status: GroupMemberStatus,
    @Param('groupMemberId') groupMemberId: string,
  ) {
    return this.groupService.browseMember(groupMemberId, status);
  }
  @Get(':id')
  @Public()
  getById(@Param('id') id: string) {
    return this.groupService.getById(id);
  }
}
