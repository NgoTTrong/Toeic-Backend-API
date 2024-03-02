import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdatePart5Dto } from './dto/update-part5.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Answer } from '@prisma/client';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class Part5Service {
  constructor(private readonly prismaService: PrismaService) {}

  async create(title: string, userId: string) {
    return this.prismaService.part5.create({
      data: {
        title: title,
        creatorId: userId,
      },
    });
  }
  
  async findAll(userId: string) {
    return this.prismaService.part5.findMany({
      where: {
        creatorId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string, userId: string) {
    return this.prismaService.part5.findFirst({
      where: { id, creatorId: userId },
      include: {
        part5Questions: {
          include: {
            question: true,
          },
          orderBy: {
            position: 'asc',
          },
        },
      },
    });
  }

  update(id: string, updatePart5Dto: UpdatePart5Dto) {
    return this.prismaService.part5.update({
      where: { id },
      data: updatePart5Dto,
    });
  }
  async updateQuestion(part5QuestionId: string, dto: UpdateQuestionDto) {
    const _part5Question = await this.prismaService.part5Question.update({
      where: { id: part5QuestionId },
      data: {},
    });

    await this.prismaService.question.update({
      where: {
        id: dto?.question?.id,
      },
      data: {
        content: dto?.question?.content,
        optionA: dto?.question?.optionA,
        optionB: dto?.question?.optionB,
        optionC: dto?.question?.optionC,
        optionD: dto?.question?.optionD,
        explain: dto?.question?.explain,
        answer: dto?.question?.answer as Answer,
      },
    });
    return _part5Question;
  }
  remove(id: string) {
    return this.prismaService.part5.delete({ where: { id } });
  }
  async removeQuestion(part5QuestionId: string) {
    const part5Question = await this.prismaService.part5Question.findFirst({
      where: { id: part5QuestionId },
    });
    if (!part5Question) {
      throw new BadRequestException('Part5 Question not found!');
    }
    await this.prismaService.part5Question.delete({
      where: {
        id: part5Question?.id,
        questionId: part5Question?.questionId,
      },
    });
    await this.prismaService.question.delete({
      where: {
        id: part5Question?.questionId,
      },
    });

    return part5Question.id;
  }
  async createPart5Question(part5Id: string, dto: CreateQuestionDto) {
    const _question = await this.prismaService.question.create({
      data: {
        ...dto.question,
        answer: dto?.question?.answer as Answer,
      },
    });

    const lastQuestion = await this.prismaService.part5Question.findFirst({
      where: {
        part5Id,
      },
      orderBy: {
        position: 'desc',
      },
    });
    const _part5Question = await this.prismaService.part5Question.create({
      data: {
        questionId: _question.id,
        part5Id,
        position: lastQuestion ? lastQuestion?.position + 5 : 5,
      },
    });
    return _part5Question;
  }
  async reorderQuestions(
    part5Id: string,
    updateData: { id: string; position: number }[],
  ) {
    const _part5 = await this.prismaService.part5.findFirst({
      where: { id: part5Id },
    });
    if (!_part5) {
      throw new BadRequestException('Part5 is not found!');
    }
    return await Promise.all(
      updateData.map((question) =>
        this.prismaService.part5Question.update({
          where: {
            part5Id,
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
