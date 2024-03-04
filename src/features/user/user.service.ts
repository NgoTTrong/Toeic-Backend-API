import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Client } from 'pg';
@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    @Inject('SUPABASE_CLIENT') private readonly supabaseClient: Client,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: createUserDto?.email,
      },
    });
    if (user) {
      throw new BadRequestException('Email is existed');
    }

    // return await this.prismaService.user.create({
    //   data: createUserDto,
    // });
  }

  findAll(skip: number, take: number) {
    return this.prismaService.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
    });
  }

  async getCurrentUserLogin(userId) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await this.supabaseClient.query(query, [userId]);
    return result.rows[0];
  }

  findOne(id: number) {
    return this.prismaService.user.findFirst({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return this.prismaService.user.findFirst({
      where: { email },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
