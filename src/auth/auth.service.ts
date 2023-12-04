import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { Payload } from 'src/core/type/jwt.payload';
import { environments } from 'src/environments';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    if (!user) {
      throw new BadRequestException(`Not found User "${user?.email}"`);
    }

    const payload: Payload = {
      avatar: user.avatar,
      email: user.email,
      id: user.id,
      name: user.name,
      phone: user.phone,
    };
    await this.mailerService.sendMail({
      to: user?.email,
      subject: 'Welcome to Toeic Mastery',
      template: './register-success',
      context: {
        name: user.name,
      },
    });
    return {
      user,
      acessToken: await this.jwtService.signAsync(
        payload,
        this.getAccessTokenOptions(),
      ),
      refreshToken: await this.jwtService.signAsync(
        payload,
        this.getRefreshTokenOptions(),
      ),
    };
  }
  async login(userInfo: LoginDto) {
    const user = await this.userService.findByEmail(userInfo?.email);

    if (!user) {
      throw new BadRequestException(`Not found User "${userInfo?.email}"`);
    }

    if (userInfo?.password != user?.password) {
      throw new BadRequestException('Wrong password');
    }
    const payload: Payload = {
      avatar: user.avatar,
      email: user.email,
      id: user.id,
      name: user.name,
      phone: user.phone,
    };

    return {
      user,
      acessToken: await this.jwtService.signAsync(
        payload,
        this.getAccessTokenOptions(),
      ),
      refreshToken: await this.jwtService.signAsync(
        payload,
        this.getRefreshTokenOptions(),
      ),
    };
  }
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
