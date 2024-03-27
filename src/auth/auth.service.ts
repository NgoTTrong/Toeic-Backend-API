import { BadRequestException, Injectable } from '@nestjs/common';
import { Payload } from 'src/core/type/jwt.payload';
import { environments } from 'src/environments';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import clerk from '@clerk/clerk-sdk-node';
import { UserService } from 'src/features/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async loginClerk(userId: string) {
    const _user = await this.prismaService.user.findFirst({
      where: { id: userId },
    });
    if (_user) {
      if (_user.active == 'INACTIVE')
        throw new BadRequestException('Your account is inactive');

      return _user;
    } else {
      const data = await clerk.users.getUser(userId);
      const newUser = await this.prismaService.user.create({
        data: {
          id: userId,
          avatar: data.imageUrl,
          phone: data.phoneNumbers?.[0]?.phoneNumber,
          email: data.emailAddresses?.[0]?.emailAddress,
          name: data.firstName + ' ' + data?.lastName,
        },
      });

      return newUser;
    }
  }

  getAccessTokenOptions(): JwtSignOptions {
    return this.getTokenOptions('access');
  }

  getRefreshTokenOptions(): JwtSignOptions {
    return this.getTokenOptions('refresh');
  }

  private getTokenOptions(type: 'refresh' | 'access') {
    const options: JwtSignOptions = {
      secret: environments[type + 'TokenSecret'],
    };

    const expiration = environments[type + 'TokenExpiration'];

    if (expiration) {
      options.expiresIn = expiration;
    }

    return options;
  }
}
