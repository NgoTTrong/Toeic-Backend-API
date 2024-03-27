import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUser, Public } from 'src/core/decorators';
import { Payload } from 'src/core/type/jwt.payload';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoginClerkDto } from './dto/login-clerk.dto';
import { UserService } from 'src/features/user/user.service';
import { CreateUserDto } from 'src/features/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/features/user/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Post('login-clerk')
  @Public()
  async loginClerk(@Body() loginDto: LoginClerkDto) {
    return this.authService.loginClerk(loginDto.userId);
  }
  @Get('google')
  @Public()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @Public()
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    // return this.authService.googleLogin(req);
  }

  @Post('register')
  @Public()
  register(@Body() createUserDto: CreateUserDto) {
    // return this.authService.create(createUserDto);
  }
  @Post('login')
  @Public()
  login(@Body() loginDto: LoginDto) {
    // return this.authService.login(loginDto);
  }
  @Get('me')
  findAll(@GetUser() user: Payload) {
    return this.userService.findOne(user?.id);
  }

  @Post('change-password')
  changePassword(
    @GetUser() user: Payload,
    @Body() changePasswordDto: UpdateUserDto,
  ) {
    return this.userService.update(user?.id, changePasswordDto);
  }
}
