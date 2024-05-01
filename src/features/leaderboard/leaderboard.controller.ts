import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  Options,
} from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { GetUser } from 'src/core/decorators';
import { Payload } from 'src/core/type/jwt.payload';
import { ReceivePointDto } from './dto/receive-point.dto';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  getLeaderBoard(@GetUser() user: Payload) {
    return this.leaderboardService.getLeaderBoard(user?.id);
  }

  @Post('receive-point')
  receivePoint(@GetUser() user: Payload, @Body() dto: ReceivePointDto) {
    return this.leaderboardService.reveicePoint(user?.id, dto?.point);
  }
}
