import { Injectable } from '@nestjs/common';
import { CreateFeedCategoryDto } from './dto/create-feed-category.dto';
import { UpdateFeedCategoryDto } from './dto/update-feed-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FeedCategoryService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createFeedCategoryDto: CreateFeedCategoryDto) {
    return this.prismaService.feedCategory.create({
      data: createFeedCategoryDto,
    });
  }

  findAll() {
    return this.prismaService.feedCategory.findMany();
  }

  findOne(id: string) {
    return this.prismaService.feedCategory.findFirst({ where: { id } });
  }

  update(id: string, updateFeedCategoryDto: UpdateFeedCategoryDto) {
    return this.prismaService.feedCategory.update({
      where: { id },
      data: updateFeedCategoryDto,
    });
  }

  remove(id: string) {
    return this.prismaService.feedCategory.delete({ where: { id } });
  }
}
