import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdatePart7Dto } from './dto/update-part7.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Answer } from '@prisma/client';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class Part7Service {
  constructor(private readonly prismaService: PrismaService) {}
  
  async create(title: string, userId: string) {
    return this.prismaService.part7.create({
      data: {
        title: title,
        creatorId: userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prismaService.part7.findMany({
      where: {
        creatorId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, userId: string) {
    return this.prismaService.part7.findFirst({
      where: { id, creatorId: userId },
      include: {
        part7Questions: {
          include: {
            groupPart7Questions: {
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

  async update(id: string, updatePart7Dto: UpdatePart7Dto) {
    return this.prismaService.part7.update({
      where: { id },
      data: updatePart7Dto,
    });
  }

  async updateQuestion(part7QuestionId: string, dto: UpdateQuestionDto) {
    const _part7Question = await this.prismaService.part7Question.update({
      where: { id: part7QuestionId },
      data: {
        imageUrls: dto?.imageUrl ? [dto?.imageUrl] : []
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
    return _part7Question;
  }

  async remove(id: string) {
    return this.prismaService.part7.delete({ where: { id } });
  }

  async removeGroup(part7QuestionId: string) {
    const part7Question = await this.prismaService.part7Question.findFirst({
      where: { id: part7QuestionId },
    });
    if (!part7Question) {
      throw new BadRequestException('Part 7 question is not found!');
    }
    const _questions = await this.prismaService.mappingPart7Question.findMany({
      where: { part7QuestionId },
    });
    await Promise.all(
      _questions.map((question) =>
        this.prismaService.mappingPart7Question.delete({
          where: {
            part7QuestionId_questionId: {
              part7QuestionId: question?.part7QuestionId,
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

    await this.prismaService.part7Question.delete({
      where: { id: part7QuestionId },
    });
    return part7Question.id;
  }

  async createPart7Question(part7Id: string, dto: CreateQuestionDto) {
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

    const lastQuestion = await this.prismaService.part7Question.findFirst({
      where: {
        part7Id,
      },
      orderBy: {
        position: 'desc',
      },
    });
    const _part7Question = await this.prismaService.part7Question.create({
      data: {
        part7Id,
        position: lastQuestion ? lastQuestion?.position + 1 : 1,
        imageUrls: dto?.imageUrl ? [dto.imageUrl] : [],
      },
    });
    await this.prismaService.mappingPart7Question.createMany({
      data: _questions.map((questionId, index) => ({
        questionId,
        part7QuestionId: _part7Question.id,
        position: index + 1,
      })),
    });
    return _part7Question;
  }

  async reorderQuestions(
    part7Id: string,
    updateData: { id: string; position: number }[],
  ) {
    const _part7 = await this.prismaService.part7.findFirst({
      where: { id: part7Id },
    });
    if (!_part7) {
      throw new BadRequestException('Part 7 is not found!');
    }
    return await Promise.all(
      updateData.map((question) =>
        this.prismaService.part7Question.update({
          where: {
            part7Id,
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
