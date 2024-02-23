import { Injectable } from '@nestjs/common';
import { CreatePart5Dto } from './dto/create-part5.dto';
import { UpdatePart5Dto } from './dto/update-part5.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Explain } from '@prisma/client';

@Injectable()
export class Part5Service {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createPart5Dto: CreatePart5Dto) {
    const _part5 = await this.prismaService.part5.create({
      data: {
        thumbnail: createPart5Dto.thumbnail,
        introduction: createPart5Dto.introduction,
        numOfQuestions: createPart5Dto.questions.length,
      },
    });
    await Promise.all(
      createPart5Dto.questions.map(async (question) => {
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
        return await this.prismaService.part5Question.create({
          data: {
            questionId: createdQuestion.id,
            part5Id: _part5.id,
            explainId: _explain?.id,
            topicId: question.topicId,
          },
        });
      }),
    );
    return 'Done';
  }

  findAll() {
    return this.prismaService.part5.findMany({});
  }

  findOne(id: string) {
    return this.prismaService.part5.findFirst({ where: { id } });
  }

  update(id: string, updatePart5Dto: UpdatePart5Dto) {
    return `This action updates a #${id} part5`;
  }

  remove(id: string) {
    return this.prismaService.part5.delete({ where: { id } });
  }
}
