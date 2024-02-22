import { Injectable } from '@nestjs/common';
import { CreatePart1Dto } from './dto/create-part1.dto';
import { UpdatePart1Dto } from './dto/update-part1.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Answer, Explain } from '@prisma/client';
import { CreateQuestionDto } from './dto/create-question.dto';

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
  async create(createPart1Dto: CreatePart1Dto) {
    const _part1 = await this.prismaService.part1.create({
      data: {
        thumbnail: createPart1Dto.thumbnail,
        introduction: createPart1Dto.introduction,
        numOfQuestions: createPart1Dto.questions.length,
      },
    });
    await Promise.all(
      createPart1Dto.questions.map(async (question) => {
        let _explain: Explain;
        if (question?.explain) {
          _explain = await this.prismaService.explain.create({
            data: question.explain,
          });
        }
        const createdQuestion = await this.prismaService.question.create({
          data: {
            content: question.question.content,
            optionA: question.question.optionA,
            optionB: question.question.optionB,
            optionC: question.question.optionC,
            optionD: question.question.optionD,
          },
        });
        return await this.prismaService.part1Question.create({
          data: {
            imageUrls: question.imageUrls,
            audioUrl: question.audioUrl,
            questionId: createdQuestion.id,
            part1Id: _part1.id,
            explainId: _explain?.id,
            topicId: question.topicId,
          },
        });
      }),
    );
    return 'Done';
  }

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
    });
  }

  update(id: string, updatePart1Dto: UpdatePart1Dto) {
    return this.prismaService.part1.update({
      where: { id },
      data: updatePart1Dto,
    });
  }

  remove(id: string) {
    return this.prismaService.part1.delete({ where: { id } });
  }

  async createPart1Question(part1Id: string, dto: CreateQuestionDto) {
    const _question = await this.prismaService.question.create({
      data: dto.question,
    });
    const _explain = await this.prismaService.explain.create({
      data: {
        explain: dto.explaination,
        answer: dto.correctAnswer as Answer,
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
        imageUrls: [dto.imageUrl],
        audioUrl: dto.audioUrl,
        questionId: _question.id,
        explainId: _explain.id,
        part1Id,
        position: lastQuestion ? lastQuestion?.position + 1 : 1,
        topicId: dto.topicId,
      },
    });
    return _part1Question;
  }
}
