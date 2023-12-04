import { Injectable } from '@nestjs/common';
import { CreateCategoryFeedDto } from './dto/create-category-feed.dto';
import { UpdateCategoryFeedDto } from './dto/update-category-feed.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryFeedService {
  constructor(private prismaService: PrismaService) {}

  create(createCategoryFeedDto: CreateCategoryFeedDto) {
    return this.prismaService.categoryFeed.create({
      data: createCategoryFeedDto,
    });
  }

  findAll() {
    return this.prismaService.categoryFeed.findMany({});
  }

  findOne(id: number) {
    return this.prismaService.categoryFeed.findFirst({
      where: {
        id,
      },
    });
  }

  update(id: number, updateCategoryFeedDto: UpdateCategoryFeedDto) {
    return this.prismaService.categoryFeed.update({
      where: {
        id,
      },
      data: updateCategoryFeedDto,
    });
  }

  remove(id: number) {
    return this.prismaService.categoryFeed.delete({
      where: { id },
    });
  }
}
