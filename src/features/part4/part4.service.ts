import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdatePart4Dto } from './dto/update-part4.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Answer } from '@prisma/client';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class Part4Service {
  constructor(private readonly prismaService: PrismaService) {}
  
  async create(title: string, userId: string) {
    return this.prismaService.part4.create({
      data: {
        title: title,
        creatorId: userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prismaService.part4.findMany({
      where: {
        creatorId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, userId: string) {
    return this.prismaService.part4.findFirst({
      where: { id, creatorId: userId },
      include: {
        part4Questions: {
          include: {
            groupPart4Questions: {
              include: {
                question: true,
              },
              orderBy: {
                position: 'asc',
              },
            },
          },
          orderBy: {
            position: 'asc',
          },
        },
      },
    });
  }

  async update(id: string, updatePart4Dto: UpdatePart4Dto) {
    return this.prismaService.part4.update({
      where: { id },
      data: updatePart4Dto,
    });
  }

  async updateQuestion(part4QuestionId: string, dto: UpdateQuestionDto) {
    const _part4Question = await this.prismaService.part4Question.update({
      where: { id: part4QuestionId },
      data: {
        imageUrls: dto?.imageUrl ? [dto?.imageUrl] : [],
        audioUrl: dto.audioUrl ?? undefined,
      },
    });

    await Promise.all(
      dto.questions.map((question) =>
        this.prismaService.question.update({
          where: {
            id: question.id,
          },
          data: {
            content: question?.content,
            optionA: question?.optionA,
            optionB: question?.optionB,
            optionC: question?.optionC,
            optionD: question?.optionD,
            explain: question?.explain,
            answer: question?.answer as Answer,
            topicId: question?.topicId,
          },
        }),
      ),
    );
    return _part4Question;
  }

  async remove(id: string) {
    return this.prismaService.part4.delete({ where: { id } });
  }

  async removeGroup(part4QuestionId: string) {
    const part4Question = await this.prismaService.part4Question.findFirst({
      where: { id: part4QuestionId },
    });
    if (!part4Question) {
      throw new BadRequestException('Part 4 question is not found!');
    }
    const _questions = await this.prismaService.mappingPart4Question.findMany({
      where: { part4QuestionId },
    });
    await Promise.all(
      _questions.map((question) =>
        this.prismaService.mappingPart4Question.delete({
          where: {
            part4QuestionId_questionId: {
              part4QuestionId: question?.part4QuestionId,
              questionId: question?.questionId,
            },
          },
        }),
      ),
    );
    await Promise.all(
      _questions.map((question) =>
        this.prismaService.question.delete({
          where: {
            id: question.questionId,
          },
        }),
      ),
    );

    await this.prismaService.part4Question.delete({
      where: { id: part4QuestionId },
    });
    return part4Question.id;
  }

  async createPart4Question(part4Id: string, dto: CreateQuestionDto) {
    const _questions = await Promise.all(
      dto.questions.map(async (question) => {
        const _question = await this.prismaService.question.create({
          data: {
            ...question,
            answer: question?.answer as Answer,
          },
        });
        return _question?.id;
      }),
    );

    const lastQuestion = await this.prismaService.part4Question.findFirst({
      where: {
        part4Id,
      },
      orderBy: {
        position: 'desc',
      },
    });
    const _part4Question = await this.prismaService.part4Question.create({
      data: {
        audioUrl: dto.audioUrl,
        part4Id,
        position: lastQuestion ? lastQuestion?.position + 1 : 1,
        imageUrls: dto?.imageUrl ? [dto.imageUrl] : [],
      },
    });
    await this.prismaService.mappingPart4Question.createMany({
      data: _questions.map((questionId, index) => ({
        questionId,
        part4QuestionId: _part4Question.id,
        position: index + 1,
      })),
    });
    return _part4Question;
  }

  async reorderQuestions(
    part4Id: string,
    updateData: { id: string; position: number }[],
  ) {
    const _part4 = await this.prismaService.part4.findFirst({
      where: { id: part4Id },
    });
    if (!_part4) {
      throw new BadRequestException('Part 4 is not found!');
    }
    return await Promise.all(
      updateData.map((question) =>
        this.prismaService.part4Question.update({
          where: {
            part4Id,
            id: question?.id,
          },
          data: {
            position: question?.position,
          },
        }),
      ),
    );
  }



  
}
