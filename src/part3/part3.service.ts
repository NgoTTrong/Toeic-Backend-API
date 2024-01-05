import { Injectable } from '@nestjs/common';
import { CreatePart3Dto } from './dto/create-part3.dto';
import { UpdatePart3Dto } from './dto/update-part3.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Explain } from '@prisma/client';

@Injectable()
export class Part3Service {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPart3Dto: CreatePart3Dto) {
    //Create part 3
    const _part3 = await this.prismaService.part3.create({
      data: {
        thumbnail: createPart3Dto.thumbnail,
        introduction: createPart3Dto.introduction,
        numOfQuestions: createPart3Dto.questions.length,
      },
    });
    // Create part 3 child
    await Promise.all(
      createPart3Dto.questions.map(async (question) => {
        let _explain: Explain;
        // Create explain if exist
        if (question?.explain) {
          _explain = await this.prismaService.explain.create({
            data: question.explain,
          });
        }
        //Create part 3 question
        const _part3Question = await this.prismaService.part3Question.create({
          data: {
            audioUrl: question.audioUrl,
            imageUrls: question.imageUrls,
            part3Id: _part3.id,
            explainId: _explain?.id,
          },
        });
        // Create part 3 question childs
        await Promise.all(
          question.questions.map(async (_question) => {
            // Create question
            const createdQuestion = await this.prismaService.question.create({
              data: {
                content: _question.content,
                optionA: _question.optionA,
                optionB: _question.optionB,
                optionC: _question.optionC,
                optionD: _question.optionD,
              },
            });
            //Add to mapping table
            await this.prismaService.mappingPart3Question.create({
              data: {
                questionId: createdQuestion.id,
                part3QuestionId: _part3Question.id,
              },
            });
          }),
        );
      }),
    );
    return 'Done';
  }

  findAll() {
    return this.prismaService.part3.findMany({});
  }

  findOne(id: number) {
    return this.prismaService.part3.findFirst({ where: { id } });
  }

  update(id: number, updatePart3Dto: UpdatePart3Dto) {
    return `This action updates a #${id} part3`;
  }

  remove(id: number) {
    return this.prismaService.part3.delete({ where: { id } });
  }
}
