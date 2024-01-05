import { Injectable } from '@nestjs/common';
import { CreatePart1Dto } from './dto/create-part1.dto';
import { UpdatePart1Dto } from './dto/update-part1.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Explain } from '@prisma/client';

@Injectable()
export class Part1Service {
  constructor(private readonly prismaService: PrismaService) {}
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

  findAll() {
    return this.prismaService.part1.findMany({});
  }

  findOne(id: number) {
    return this.prismaService.part1.findFirst({ where: { id } });
  }

  update(id: number, updatePart1Dto: UpdatePart1Dto) {
    return `This action updates a #${id} part1`;
  }

  remove(id: number) {
    return this.prismaService.part1.delete({ where: { id } });
  }
}
