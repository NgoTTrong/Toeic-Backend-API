import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { GoogleStrategy } from './google.strategy';
import { UserService } from 'src/features/user/user.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JwtService,
    GoogleStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
