import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TopicService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createTopicDto: CreateTopicDto) {
    return this.prismaService.topic.createMany({
      data: createTopicDto.names.map((name) => ({ name })),
    });
  }

  findAll() {
    return this.prismaService.topic.findMany();
  }

  findOne(id: string) {
    return this.prismaService.topic.findFirst({ where: { id } });
  }

  update(id: string, updateTopicDto: UpdateTopicDto) {
    return this.prismaService.topic.update({
      where: { id },
      data: updateTopicDto,
    });
  }

  remove(id: string) {
    return this.prismaService.topic.delete({ where: { id } });
  }
}
