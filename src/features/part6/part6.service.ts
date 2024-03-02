import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdatePart6Dto } from './dto/update-part6.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Answer } from '@prisma/client';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class Part6Service {
  constructor(private readonly prismaService: PrismaService) {}
  
  async create(title: string, userId: string) {
    return this.prismaService.part6.create({
      data: {
        title: title,
        creatorId: userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prismaService.part6.findMany({
      where: {
        creatorId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, userId: string) {
    return this.prismaService.part6.findFirst({
      where: { id, creatorId: userId },
      include: {
        part6Questions: {
          include: {
            groupPart6Questions: {
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

  async update(id: string, updatePart6Dto: UpdatePart6Dto) {
    return this.prismaService.part6.update({
      where: { id },
      data: updatePart6Dto,
    });
  }

  async updateQuestion(part6QuestionId: string, dto: UpdateQuestionDto) {
    const _part6Question = await this.prismaService.part6Question.update({
      where: { id: part6QuestionId },
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
    return _part6Question;
  }

  async remove(id: string) {
    return this.prismaService.part6.delete({ where: { id } });
  }

  async removeGroup(part6QuestionId: string) {
    const part6Question = await this.prismaService.part6Question.findFirst({
      where: { id: part6QuestionId },
    });
    if (!part6Question) {
      throw new BadRequestException('Part 6 question is not found!');
    }
    const _questions = await this.prismaService.mappingPart6Question.findMany({
      where: { part6QuestionId },
    });
    await Promise.all(
      _questions.map((question) =>
        this.prismaService.mappingPart6Question.delete({
          where: {
            part6QuestionId_questionId: {
              part6QuestionId: question?.part6QuestionId,
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

    await this.prismaService.part6Question.delete({
      where: { id: part6QuestionId },
    });
    return part6Question.id;
  }

  async createPart6Question(part6Id: string, dto: CreateQuestionDto) {
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

    const lastQuestion = await this.prismaService.part6Question.findFirst({
      where: {
        part6Id,
      },
      orderBy: {
        position: 'desc',
      },
    });
    const _part6Question = await this.prismaService.part6Question.create({
      data: {
        part6Id,
        position: lastQuestion ? lastQuestion?.position + 1 : 1,
        imageUrls: dto?.imageUrl ? [dto.imageUrl] : [],
      },
    });
    await this.prismaService.mappingPart6Question.createMany({
      data: _questions.map((questionId, index) => ({
        questionId,
        part6QuestionId: _part6Question.id,
        position: index + 1,
      })),
    });
    return _part6Question;
  }

  async reorderQuestions(
    part6Id: string,
    updateData: { id: string; position: number }[],
  ) {
    const _part6 = await this.prismaService.part6.findFirst({
      where: { id: part6Id },
    });
    if (!_part6) {
      throw new BadRequestException('Part 6 is not found!');
    }
    return await Promise.all(
      updateData.map((question) =>
        this.prismaService.part6Question.update({
          where: {
            part6Id,
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
