import { Part3 } from './entities/part3.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePart3Dto } from './dto/create-part3.dto';
import { UpdatePart3Dto } from './dto/update-part3.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Answer } from '@prisma/client';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class Part3Service {
  constructor(private readonly prismaService: PrismaService) {}

  async createV2(title: string, userId: string) {
    return this.prismaService.part3.create({
      data: {
        title: title,
        creatorId: userId,
      },
    });
  }
  // async create(createPart3Dto: CreatePart3Dto) {
  //   const _part3 = await this.prismaService.part3.create({
  //     data: {
  //       thumbnail: createPart3Dto.thumbnail,
  //       introduction: createPart3Dto.introduction,
  //       numOfQuestions: createPart3Dto.questions.length,
  //     },
  //   });
  //   await Promise.all(
  //     createPart3Dto.questions.map(async (question) => {
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
  //           optionD: question.question.optionD,
  //         },
  //       });
  //       return await this.prismaService.part3Question.create({
  //         data: {
  //           audioUrl: question.audioUrl,
  //           questionId: createdQuestion.id,
  //           part3Id: _part3.id,
  //           explainId: _explain?.id,
  //           topicId: question.topicId,
  //         },
  //       });
  //     }),
  //   );
  //   return 'Done';
  // }

  findAll(userId: string) {
    return this.prismaService.part3.findMany({
      where: {
        creatorId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string, userId: string) {
    return this.prismaService.part3.findFirst({
      where: { id, creatorId: userId },
      include: {
        part3Questions: {
          include: {
            groupPart3Questions: {
              include: {
                question: true,
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

  update(id: string, updatePart3Dto: UpdatePart3Dto) {
    return this.prismaService.part3.update({
      where: { id },
      data: updatePart3Dto,
    });
  }
  async updateQuestion(part3QuestionId: string, dto: UpdateQuestionDto) {
    const _part3Question = await this.prismaService.part3Question.update({
      where: { id: part3QuestionId },
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
    return _part3Question;
  }
  remove(id: string) {
    return this.prismaService.part3.delete({ where: { id } });
  }

  async createPart3Question(part3Id: string, dto: CreateQuestionDto) {
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

    const lastQuestion = await this.prismaService.part3Question.findFirst({
      where: {
        part3Id,
      },
      orderBy: {
        position: 'desc',
      },
    });
    const _part3Question = await this.prismaService.part3Question.create({
      data: {
        audioUrl: dto.audioUrl,
        part3Id,
        position: lastQuestion ? lastQuestion?.position + 1 : 1,
      },
    });
    return _part3Question;
  }
  async reorderQuestions(
    part3Id: string,
    updateData: { id: string; position: number }[],
  ) {
    const _part3 = await this.prismaService.part3.findFirst({
      where: { id: part3Id },
    });
    if (!_part3) {
      throw new BadRequestException('Part 3 is not found!');
    }
    return await Promise.all(
      updateData.map((question) =>
        this.prismaService.part3Question.update({
          where: {
            part3Id,
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
