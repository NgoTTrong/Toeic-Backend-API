import { Injectable } from '@nestjs/common';
import { CreatePart4Dto } from './dto/create-part4.dto';
import { UpdatePart4Dto } from './dto/update-part4.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Explain } from '@prisma/client';

@Injectable()
export class Part4Service {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createPart4Dto: CreatePart4Dto) {
    //Create part 4
    const _part4 = await this.prismaService.part4.create({
      data: {
        thumbnail: createPart4Dto.thumbnail,
        introduction: createPart4Dto.introduction,
        numOfQuestions: createPart4Dto.questions.length,
      },
    });
    // Create part 4 child
    await Promise.all(
      createPart4Dto.questions.map(async (question) => {
        let _explain: Explain;
        // Create explain if exist
        if (question?.explain) {
          _explain = await this.prismaService.explain.create({
            data: question.explain,
          });
        }
        //Create part 4 question
        const _part4Question = await this.prismaService.part4Question.create({
          data: {
            audioUrl: question.audioUrl,
            imageUrls: question.imageUrls,
            part4Id: _part4.id,
            explainId: _explain?.id,
          },
        });
        // Create part 4 question childs
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
            await this.prismaService.mappingPart4Question.create({
              data: {
                questionId: createdQuestion.id,
                part4QuestionId: _part4Question.id,
              },
            });
          }),
        );
      }),
    );
    return 'Done';
  }

  findAll() {
    return this.prismaService.part4.findMany({});
  }

  findOne(id: string) {
    return this.prismaService.part4.findFirst({ where: { id } });
  }

  update(id: string, updatePart4Dto: UpdatePart4Dto) {
    return `This action updates a #${id} part4`;
  }

  remove(id: string) {
    return this.prismaService.part4.delete({ where: { id } });
  }
}
