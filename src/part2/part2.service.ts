import { Injectable } from '@nestjs/common';
import { CreatePart2Dto } from './dto/create-part2.dto';
import { UpdatePart2Dto } from './dto/update-part2.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Explain } from '@prisma/client';

@Injectable()
export class Part2Service {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createPart2Dto: CreatePart2Dto) {
    const _part2 = await this.prismaService.part2.create({
      data: {
        thumbnail: createPart2Dto.thumbnail,
        introduction: createPart2Dto.introduction,
        numOfQuestions: createPart2Dto.questions.length,
      },
    });
    await Promise.all(
      createPart2Dto.questions.map(async (question) => {
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
        return await this.prismaService.part2Question.create({
          data: {
            audioUrl: question.audioUrl,
            questionId: createdQuestion.id,
            part2Id: _part2.id,
            explainId: _explain?.id,
            topicId: question.topicId,
          },
        });
      }),
    );
    return 'Done';
  }

  findAll() {
    return this.prismaService.part2.findMany({});
  }

  findOne(id: number) {
    return this.prismaService.part2.findFirst({ where: { id } });
  }

  update(id: number, updatePart2Dto: UpdatePart2Dto) {
    return `This action updates a #${id} part2`;
  }

  remove(id: number) {
    return this.prismaService.part2.delete({ where: { id } });
  }
}
