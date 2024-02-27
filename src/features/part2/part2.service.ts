import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePart2Dto } from './dto/create-part2.dto';
import { UpdatePart2Dto } from './dto/update-part2.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Answer } from '@prisma/client';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class Part2Service {
  constructor(private readonly prismaService: PrismaService) {}

  async createV2(title: string, userId: string) {
    return this.prismaService.part2.create({
      data: {
        title: title,
        creatorId: userId,
      },
    });
  }
  // async create(createPart2Dto: CreatePart2Dto) {
  //   const _part2 = await this.prismaService.part2.create({
  //     data: {
  //       thumbnail: createPart2Dto.thumbnail,
  //       introduction: createPart2Dto.introduction,
  //       numOfQuestions: createPart2Dto.questions.length,
  //     },
  //   });
  //   await Promise.all(
  //     createPart2Dto.questions.map(async (question) => {
  //       let _explain: Explain;
  //       if (question?.explain) {
  //         _explain = await this.prismaService.explain.create({
  //           data: question.explain,
  //         });
  //       }
  //       const createdQuestion = await this.prismaService.question.create({
  //         data: {
  //           content: question.question.content,
  //           optionA: question.question.optionA,
  //           optionB: question.question.optionB,
  //           optionC: question.question.optionC,
  //         },
  //       });
  //       return await this.prismaService.part2Question.create({
  //         data: {
  //           audioUrl: question.audioUrl,
  //           questionId: createdQuestion.id,
  //           part2Id: _part2.id,
  //           explainId: _explain?.id,
  //           topicId: question.topicId,
  //         },
  //       });
  //     }),
  //   );
  //   return 'Done';
  // }

  findAll(userId: string) {
    return this.prismaService.part2.findMany({
      where: {
        creatorId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string, userId: string) {
    return this.prismaService.part2.findFirst({
      where: { id, creatorId: userId },
      include: {
        part2Questions: {
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

  update(id: string, updatePart2Dto: UpdatePart2Dto) {
    return this.prismaService.part2.update({
      where: { id },
      data: updatePart2Dto,
    });
  }
  async updateQuestion(part2QuestionId: string, dto: UpdateQuestionDto) {
    const _part2Question = await this.prismaService.part2Question.update({
      where: { id: part2QuestionId },
      data: {
        audioUrl: dto.audioUrl ?? undefined,
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
        explain: dto?.question?.explain,
        answer: dto?.question?.answer as Answer,
      },
    });
    return _part2Question;
  }
  remove(id: string) {
    return this.prismaService.part2.delete({ where: { id } });
  }
  async removeQuestion(part2QuestionId: string) {
    const part2Question = await this.prismaService.part2Question.findFirst({
      where: { id: part2QuestionId },
    });
    if (!part2Question) {
      throw new BadRequestException('Part2 Question not found!');
    }
    await this.prismaService.part2Question.delete({
      where: {
        id: part2Question?.id,
        questionId: part2Question?.questionId,
      },
    });
    await this.prismaService.question.delete({
      where: {
        id: part2Question?.questionId,
      },
    });

    return part2Question.id;
  }

  async createpart2Question(part2Id: string, dto: CreateQuestionDto) {
    const _question = await this.prismaService.question.create({
      data: { ...dto.question, answer: dto?.question?.answer as Answer },
    });

    const lastQuestion = await this.prismaService.part2Question.findFirst({
      where: {
        part2Id,
      },
      orderBy: {
        position: 'desc',
      },
    });
    const _part2Question = await this.prismaService.part2Question.create({
      data: {
        audioUrl: dto.audioUrl,
        questionId: _question.id,
        part2Id,
        position: lastQuestion ? lastQuestion?.position + 1 : 1,
      },
    });
    return _part2Question;
  }
  async reorderQuestions(
    part2Id: string,
    updateData: { id: string; position: number }[],
  ) {
    const _part2 = await this.prismaService.part2.findFirst({
      where: { id: part2Id },
    });
    if (!_part2) {
      throw new BadRequestException('Part 2 is not found!');
    }
    return await Promise.all(
      updateData.map((question) =>
        this.prismaService.part2Question.update({
          where: {
            part2Id,
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
