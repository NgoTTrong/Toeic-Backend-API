import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupMemberStatus } from '@prisma/client';
import { CreatePost } from './dto/create-post';

@Injectable()
export class GroupService {
  constructor(private readonly prismaService: PrismaService) {}

  async createGroup(userId: string, dto: CreateGroupDto) {
    const _group = await this.prismaService.group.create({
      data: {
        creatorId: userId,
        ...dto,
        isPublic: dto?.password ? false : true,
      },
    });
    await this.prismaService.groupMember.create({
      data: {
        memberId: userId,
        groupId: _group?.id,
        isOwner: true,
        status: 'JOINED',
      },
    });
    return _group;
  }
  async joinGroup(userId: string, groupId: string, password?: string) {
    const _member = await this.prismaService.groupMember.findFirst({
      where: {
        memberId: userId,
        groupId,
      },
    });
    if (_member) {
      return _member;
    }
    const _group = await this.prismaService.group.findFirst({
      where: {
        id: groupId,
      },
    });
    if (_group?.password != password) {
      throw new BadRequestException('Password wrong');
    }
    return await this.prismaService.groupMember.create({
      data: {
        memberId: userId,
        groupId,
        status: _group?.isPublic ? 'WAITING' : 'JOINED',
      },
    });
  }
  browseMember(groupMemberId: string, status?: GroupMemberStatus) {
    if (status) {
      return this.prismaService.groupMember.update({
        where: {
          id: groupMemberId,
        },
        data: {
          status,
        },
      });
    }
    return this.prismaService.groupMember.delete({
      where: {
        id: groupMemberId,
      },
    });
  }
  getAll() {
    return this.prismaService.group.findMany({
      include: {
        creator: true,
        GroupMember: true,
        _count: {
          select: { GroupMember: true },
        },
      },
    });
  }
  getById(id: string) {
    return this.prismaService.group.findFirst({
      where: {
        id,
      },
      include: {
        creator: true,
        GroupPost: {
          include: {
            creator: true,
            GroupPostComment: {
              include: {
                member: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        GroupMember: {
          include: {
            member: true,
          },
        },
      },
    });
  }
  createPost(userId: string, groupId: string, dto: CreatePost) {
    return this.prismaService.groupPost.create({
      data: {
        creatorId: userId,
        groupId: groupId,
        ...dto,
      },
    });
  }
  getAllPost(groupId: string) {
    return this.prismaService.groupPost.findMany({
      where: {
        groupId,
      },
      include: {
        creator: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  getAllCommentPost(postId: string) {
    return this.prismaService.groupPostComment.findMany({
      where: {
        postId,
        parentId: null,
      },
      include: {
        member: true,
      },
    });
  }
  getAllReplyCommentPost(commentId: string) {
    return this.prismaService.groupPostComment.findMany({
      where: {
        parentId: commentId,
      },
      include: {
        member: true,
      },
    });
  }
  commentPost(userId: string, postId: string, message: string) {
    return this.prismaService.groupPostComment.create({
      data: {
        memberId: userId,
        postId,
        message,
      },
    });
  }
  async replyComment(
    userId: string,
    postId: string,
    commentId: string,
    message: string,
  ) {
    const _reply = await this.prismaService.groupPostComment.create({
      data: {
        memberId: userId,
        postId,
        message,
        parentId: commentId,
      },
    });
    const _post = await this.prismaService.groupPostComment.findFirst({
      where: { id: commentId },
    });
    await this.prismaService.groupPostComment.update({
      where: {
        id: commentId,
      },
      data: {
        numOfReplys: _post?.numOfReplys + 1,
      },
    });
    return _reply;
  }
}
