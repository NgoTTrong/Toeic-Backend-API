import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupMemberStatus } from '@prisma/client';

@Injectable()
export class GroupService {
  constructor(private readonly prismaService: PrismaService) {}

  createGroup(userId: string, dto: CreateGroupDto) {
    return this.prismaService.group.create({
      data: {
        creatorId: userId,
        ...dto,
        isPublic: dto?.password ? false : true,
      },
    });
  }
  joinGroup(userId: string, groupId: string) {
    return this.prismaService.groupMember.create({
      data: {
        memberId: userId,
        groupId,
      },
    });
  }
  browseMember(groupMemberId: string, status: GroupMemberStatus) {
    return this.prismaService.groupMember.update({
      where: {
        id: groupMemberId,
      },
      data: {
        status,
      },
    });
  }
  getAll() {
    return this.prismaService.group.findMany({
      include: {
        creator: true,
      },
    });
  }
  getById(id: string) {
    return this.prismaService.group.findMany({
      where: {
        id,
      },
      include: {
        creator: true,
        GroupPost: true,
        GroupMember: true,
      },
    });
  }
}
