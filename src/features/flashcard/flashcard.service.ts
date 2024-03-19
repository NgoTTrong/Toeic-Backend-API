import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateFlashCardDto } from './dto/update-flahcard.dto';
import { CreateWordDto } from './dto/create-word.dto';
import { CreateFlashCardDto } from './dto/create-flashcard.dto';

@Injectable()
export class FlashCardService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateFlashCardDto, userId: string) {
    return await this.prismaService.flashCard.create({
      data: {
        ...dto,
        creatorId: userId,
      },
    });
  }

  async findAll(userId: string) {
    return await this.prismaService.flashCard.findMany({
      where: {
        creatorId: userId,
      },
      include: {
        words: true,
        creator: {
          select: {
            name: true,
            avatar: true,
          }
        }
      },
      
      orderBy: {
        createdAt: 'desc',
      },
    });
   
  }

  async findOne(id: string) {
    return  await this.prismaService.flashCard.findFirst({
      where: {
        id,
      },
      include: {
        words: true
      }
    });
  }

  async update(id: string, updateFlashCardDto: UpdateFlashCardDto) {
    return await this.prismaService.flashCard.update({
      where: { id },
      data: updateFlashCardDto,
    });
  }

  async remove(id: string) {
    await this.prismaService.word.deleteMany({
        where: {
            flashCardId: id
        }
    })
    return this.prismaService.flashCard.delete({
      where: { id },
    });
  }

  async createWord(flashCardId: string, wordDto: CreateWordDto) {
    const _word = await this.prismaService.word.create({
      data: {
        flashCardId: flashCardId,
        ...wordDto,
      },
    });

    const _flashCard = await this.prismaService.flashCard.findFirst({
      where: { id: flashCardId },
      include: {
        words: true
      }
    });

    return _flashCard;
  }
}
