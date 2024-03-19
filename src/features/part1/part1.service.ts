import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePart1Dto } from './dto/create-part1.dto';
import { UpdatePart1Dto } from './dto/update-part1.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Answer } from '@prisma/client';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class Part1Service {
  constructor(private readonly prismaService: PrismaService) {}

  async createV2(title: string, userId: string) {
    return this.prismaService.part1.create({
      data: {
        title: title,
        creatorId: userId,
        
      },
    });
  }
  // async create(createPart1Dto: CreatePart1Dto) {
  //   const _part1 = await this.prismaService.part1.create({
  //     data: {
  //       thumbnail: createPart1Dto.thumbnail,
  //       introduction: createPart1Dto.introduction,
  //       numOfQuestions: createPart1Dto.questions.length,
  //     },
  //   });
  //   await Promise.all(
  //     createPart1Dto.questions.map(async (question) => {
  //       const createdQuestion = await this.prismaService.question.create({
  //         data: {
  //           content: question.question.content,
  //           optionA: question.question.optionA,
  //           optionB: question.question.optionB,
  //           optionC: question.question.optionC,
  //           optionD: question.question.optionD,
  //           explain:
  //         },
  //       });
  //       return await this.prismaService.part1Question.create({
  //         data: {
  //           imageUrls: question.imageUrls,
  //           audioUrl: question.audioUrl,
  //           questionId: createdQuestion.id,
  //         },
  //       });
  //     }),
  //   );
  //   return 'Done';
  // }

  findAll(userId: string) {
    return this.prismaService.part1.findMany({
      where: {
        creatorId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string, userId: string) {
    return this.prismaService.part1.findFirst({
      where: { id, creatorId: userId },
      include: {
        part1Questions: {
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

  update(id: string, updatePart1Dto: UpdatePart1Dto) {
    return this.prismaService.part1.update({
      where: { id },
      data: updatePart1Dto,
    });
  }
  async updateQuestion(part1QuestionId: string, dto: UpdateQuestionDto) {
    const _part1Question = await this.prismaService.part1Question.update({
      where: { id: part1QuestionId },
      data: {
        audioUrl: dto.audioUrl ?? undefined,
        imageUrls: dto.imageUrl ? [dto.imageUrl] : undefined,
      },
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
    return _part1Question;
  }
  remove(id: string) {
    return this.prismaService.part1.delete({ where: { id } });
  }
  async removeQuestion(part1QuestionId: string) {
    const part1Question = await this.prismaService.part1Question.findFirst({
      where: { id: part1QuestionId },
    });
    if (!part1Question) {
      throw new BadRequestException('Part1 Question not found!');
    }
    await this.prismaService.part1Question.delete({
      where: {
        id: part1Question?.id,
        questionId: part1Question?.questionId,
      },
    });
    await this.prismaService.question.delete({
      where: {
        id: part1Question?.questionId,
      },
    });

    return part1Question.id;
  }
  async createPart1Question(part1Id: string, dto: CreateQuestionDto) {
    const _question = await this.prismaService.question.create({
      data: {
        ...dto.question,
        answer: dto?.question?.answer as Answer,
      },
    });

    const lastQuestion = await this.prismaService.part1Question.findFirst({
      where: {
        part1Id,
      },
      orderBy: {
        position: 'desc',
      },
    });
    const _part1Question = await this.prismaService.part1Question.create({
      data: {
        audioUrl: dto.audioUrl,
        imageUrls: [dto.imageUrl],
        questionId: _question.id,
        part1Id,
        position: lastQuestion ? lastQuestion?.position + 1 : 1,
      },
    });
    return _part1Question;
  }
  async reorderQuestions(
    part1Id: string,
    updateData: { id: string; position: number }[],
  ) {
    const _part1 = await this.prismaService.part1.findFirst({
      where: { id: part1Id },
    });
    if (!_part1) {
      throw new BadRequestException('Part1 is not found!');
    }
    return await Promise.all(
      updateData.map((question) =>
        this.prismaService.part1Question.update({
          where: {
            part1Id,
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
