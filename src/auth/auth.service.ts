import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { Payload } from 'src/core/type/jwt.payload';
import { environments } from 'src/environments';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import clerk from '@clerk/clerk-sdk-node';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}
  async loginClerk(userId: string) {
    const _user = await this.prismaService.user.findFirst({
      where: { id: userId },
    });
    if (_user) {
      if (_user.active == 'INACTIVE')
        throw new BadRequestException('Your account is inactive');
      const payload: Payload = {
        id: _user.id,
        avatar: _user.avatar,
        phone: _user.phone,
        email: _user.email,
        name: _user.name,
      };
      const accessToken = await this.jwtService.signAsync(
        payload,
        this.getAccessTokenOptions(),
      );
      return {
        user: _user,
        accessToken,
        refreshToken: await this.jwtService.signAsync(
          payload,
          this.getRefreshTokenOptions(),
        ),
      };
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
      const payload: Payload = {
        id: newUser.id,
        avatar: data.imageUrl,
        phone: data.phoneNumbers?.[0]?.phoneNumber,
        email: data.emailAddresses?.[0]?.emailAddress,
        name: data.firstName + data?.lastName,
      };
      const accessToken = await this.jwtService.signAsync(
        payload,
        this.getAccessTokenOptions(),
      );

      return {
        user: newUser,
        accessToken,
        refreshToken: await this.jwtService.signAsync(
          payload,
          this.getRefreshTokenOptions(),
        ),
      };
    }
  }
  // FIXME: change to use clerk authentication
  // async create(createUserDto: CreateUserDto) {
  //   const user = await this.userService.create(createUserDto);
  //   if (!user) {
  //     throw new BadRequestException(`Not found User "${user?.email}"`);
  //   }

  //   const payload: Payload = {
  //     avatar: user.avatar,
  //     email: user.email,
  //     id: user.id,
  //     name: user.name,
  //     phone: user.phone,
  //   };
  //   await this.mailerService.sendMail({
  //     to: user?.email,
  //     subject: 'Welcome to Toeic Mastery',
  //     template: './register-success',
  //     context: {
  //       name: user.name,
  //     },
  //   });
  //   return {
  //     user,
  //     acessToken: await this.jwtService.signAsync(
  //       payload,
  //       this.getAccessTokenOptions(),
  //     ),
  //     refreshToken: await this.jwtService.signAsync(
  //       payload,
  //       this.getRefreshTokenOptions(),
  //     ),
  //   };
  // }

  // FIXME: this authentication is change to use clerk authentication
  // async login(userInfo: LoginDto) {
  //   const user = await this.userService.findByEmail(userInfo?.email);

  //   if (!user) {
  //     throw new BadRequestException(`Not found User "${userInfo?.email}"`);
  //   }

  //   if (userInfo?.password != user?.password) {
  //     throw new BadRequestException('Wrong password');
  //   }
  //   const payload: Payload = {
  //     avatar: user.avatar,
  //     email: user.email,
  //     id: user.id,
  //     name: user.name,
  //     phone: user.phone,
  //   };

  //   return {
  //     user,
  //     acessToken: await this.jwtService.signAsync(
  //       payload,
  //       this.getAccessTokenOptions(),
  //     ),
  //     refreshToken: await this.jwtService.signAsync(
  //       payload,
  //       this.getRefreshTokenOptions(),
  //     ),
  //   };
  // }
  async forgotPassword(userInfo: ForgotPasswordDto) {
    const user = await this.userService.findByEmail(userInfo?.email);

    if (!user) {
      throw new BadRequestException(`Not found User "${userInfo?.email}"`);
    }

    const payload: Payload = {
      avatar: user.avatar,
      email: user.email,
      id: user.id,
      name: user.name,
      phone: user.phone,
    };

    const acessToken = await this.jwtService.signAsync(
      payload,
      this.getAccessTokenOptions(),
    );

    await this.mailerService.sendMail({
      to: user?.email,
      subject: 'Forgot password in Toeic Mastery',
      template: './forgot-password',
      context: {
        url: `https://blablabla/forgot-password?token=${acessToken}`,
      },
    });
    return 'Oke';
  }
  // FIXME: this authentication change to use clerik authentication
  // async googleLogin(req: any) {
  //   if (!req.user) {
  //     throw new BadRequestException('No User from google');
  //   }
  //   const _user = await this.userService.findByEmail(req.user.email);
  //   if (_user) {
  //     return {
  //       user: _user,
  //       acessToken: await this.jwtService.signAsync(
  //         {
  //           avatar: _user.avatar,
  //           email: _user.email,
  //           id: _user.id,
  //           name: _user.name,
  //           phone: _user.phone,
  //         },
  //         this.getAccessTokenOptions(),
  //       ),
  //       refreshToken: await this.jwtService.signAsync(
  //         {
  //           avatar: _user.avatar,
  //           email: _user.email,
  //           id: _user.id,
  //           name: _user.name,
  //           phone: _user.phone,
  //         },
  //         this.getRefreshTokenOptions(),
  //       ),
  //     };
  //   }
  //   const newUser = await this.prismaService.user.create({
  //     data: {
  //       email: req.user.email,
  //       name: req.user.name,
  //       avatar: req.user.avatar,
  //       authFrom: AuthFrom.GOOGLE,
  //     },
  //   });
  //   return {
  //     user: newUser,
  //     acessToken: await this.jwtService.signAsync(
  //       {
  //         avatar: newUser.avatar,
  //         email: newUser.email,
  //         id: newUser.id,
  //         name: newUser.name,
  //         phone: newUser.phone,
  //       },
  //       this.getAccessTokenOptions(),
  //     ),
  //     refreshToken: await this.jwtService.signAsync(
  //       {
  //         avatar: newUser.avatar,
  //         email: newUser.email,
  //         id: newUser.id,
  //         name: newUser.name,
  //         phone: newUser.phone,
  //       },
  //       this.getRefreshTokenOptions(),
  //     ),
  //   };
  // }
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
  example() {
    return this.mailerService.sendMail({
      to: 'trong.ngo08082002@hcmut.edu.vn', // list of receivers
      from: 'omegalumine1@gmail.com', // sender address
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: 'welcome', // plaintext body
      html: '<b>welcome</b>', // HTML body content
    });
  }
}
