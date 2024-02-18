import { Injectable } from '@nestjs/common';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FeedService {
  constructor(private prismaService: PrismaService) {}

  create(createFeedDto: CreateFeedDto, userId: string) {
    return this.prismaService.feed.create({
      data: { ...createFeedDto, userId },
    });
  }

  findAll(filter: object, skip: number, take: number) {
    return this.prismaService.feed.findMany({
      where: filter,
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
      select: {
        id: true,
        createdAt: true,
        title: true,
        content: true,
        thumbnail: true,
        categoryId: true,
        category: {
          select: {
            id: true,
            name: true,
            color: true,
            background: true,
          },
        },
        active: true,
        likes: true,
        comments: {
          select: {
            id: true,
            user: true,
            likes: true,
            content: true,
          },
          where: {
            parentId: null,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.feed.findMany({
      where: { id },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        createdAt: true,
        title: true,
        content: true,
        thumbnail: true,
        categoryId: true,
        category: {
          select: {
            id: true,
            name: true,
            color: true,
            background: true,
          },
        },
        active: true,
        likes: true,
        comments: {
          select: {
            id: true,
            user: true,
            likes: true,
            content: true,
          },
          where: {
            parentId: null,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  update(id: string, updateFeedDto: UpdateFeedDto) {
    return this.prismaService.feed.update({
      where: { id },
      data: updateFeedDto,
    });
  }

  remove(id: string) {
    return this.prismaService.feed.delete({
      where: { id },
    });
  }

  async likeOrUnlikeFeed(userId: string, feedId: string) {
    const likeFeed = await this.prismaService.likeFeed.findFirst({
      where: {
        userId,
        feedId,
      },
    });
    if (likeFeed) {
      return this.prismaService.likeFeed.delete({
        where: {
          id: likeFeed.id,
        },
      });
    } else {
      return this.prismaService.likeFeed.create({
        data: {
          userId,
          feedId,
        },
      });
    }
  }
  async likeOrUnlikeCommentFeed(userId: string, commentId: string) {
    const likeFeed = await this.prismaService.likeCommentFeed.findFirst({
      where: {
        userId,
        commentId,
      },
    });
    if (likeFeed) {
      return this.prismaService.likeCommentFeed.delete({
        where: {
          id: likeFeed.id,
        },
      });
    } else {
      return this.prismaService.likeCommentFeed.create({
        data: {
          userId,
          commentId,
        },
      });
    }
  }

  async commentFeed(userId: string, feedId: string, content: string) {
    return this.prismaService.commentFeed.create({
      data: {
        userId,
        feedId,
        content,
      },
    });
  }
  async replyCommentFeed(
    userId: string,
    feedId: string,
    commentId: string,
    content: string,
  ) {
    return this.prismaService.commentFeed.create({
      data: {
        userId,
        feedId,
        content,
        parentId: commentId,
      },
    });
  }
}
