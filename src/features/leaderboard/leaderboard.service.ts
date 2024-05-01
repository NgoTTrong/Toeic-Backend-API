import { Injectable } from '@nestjs/common';
import { LeaderBoard } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LeaderboardService {
  constructor(private readonly prismaService: PrismaService) {}

  async getLeaderBoard(userId: string) {
    let leaderBoard: LeaderBoard;
    const rank = await this.prismaService.rank.findFirst({
      orderBy: {
        minPoint: 'asc',
      },
    });
    leaderBoard = await this.prismaService.leaderBoard.findFirst({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
            rank: true,
          },
        },
      },
      skip: 0,
      take: 20,
    });
    if (!leaderBoard) {
      await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          rankId: rank?.id,
        },
      });
      leaderBoard = await this.prismaService.leaderBoard.create({
        data: {
          userId,
          point: 0,
        },
        include: {
          user: {
            select: {
              name: true,
              avatar: true,
              rank: true,
            },
          },
        },
      });
    }
    return {
      user: leaderBoard,
      leaderBoard: await this.prismaService.leaderBoard.findMany({
        orderBy: {
          point: 'desc',
        },
        include: {
          user: {
            select: {
              name: true,
              avatar: true,
              rank: true,
            },
          },
        },
      }),
    };
  }

  async reveicePoint(userId: string, point: number) {
    let leaderBoard: LeaderBoard;
    leaderBoard = await this.prismaService.leaderBoard.findFirst({
      where: {
        userId,
      },
    });
    if (!leaderBoard) {
      leaderBoard = await this.prismaService.leaderBoard.create({
        data: {
          userId,
          point,
        },
      });
    } else {
      leaderBoard = await this.prismaService.leaderBoard.update({
        where: {
          userId,
        },
        data: {
          point: leaderBoard.point + point,
        },
      });
    }
    const rank = await this.prismaService.rank.findFirst({
      where: {
        minPoint: {
          lte: leaderBoard.point,
        },
        maxPoint: {
          gte: leaderBoard.point,
        },
      },
    });
    const currentRank = await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
    });
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        rankId: rank?.id,
      },
    });
    return {
      rank,
      isUpRank: currentRank?.rankId != rank?.id,
    };
  }
}
