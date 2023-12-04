import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: createUserDto?.email,
      },
    });
    if (user) {
      throw new BadRequestException('Email is existed');
    }

    return await this.prismaService.user.create({
      data: createUserDto,
    });
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
