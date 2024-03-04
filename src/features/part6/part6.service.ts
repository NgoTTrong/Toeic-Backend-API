import { Injectable } from '@nestjs/common';
import { CreatePart6Dto } from './dto/create-part6.dto';
import { UpdatePart6Dto } from './dto/update-part6.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class Part6Service {
  constructor(private readonly prismaService: PrismaService) {}
  // async create(createPart6Dto: CreatePart6Dto) {
  //   //Create part 6
  //   const _part6 = await this.prismaService.part6.create({
  //     data: {
  //       thumbnail: createPart6Dto.thumbnail,
  //       introduction: createPart6Dto.introduction,
  //       numOfQuestions: createPart6Dto.questions.length,
  //     },
  //   });
  //   // Create part 6 child
  //   await Promise.all(
  //     createPart6Dto.questions.map(async (question) => {
  //       let _explain: Explain;
  //       // Create explain if exist
  //       if (question?.explain) {
  //         _explain = await this.prismaService.explain.create({
  //           data: question.explain,
  //         });
  //       }
  //       //Create part 6 question
  //       const _part6Question = await this.prismaService.part6Question.create({
  //         data: {
  //           imageUrls: question.imageUrls,
  //           part6Id: _part6.id,
  //           explainId: _explain?.id,
  //         },
  //       });
  //       // Create part 6 question childs
  //       await Promise.all(
  //         question.questions.map(async (_question) => {
  //           // Create question
  //           const createdQuestion = await this.prismaService.question.create({
  //             data: {
  //               content: _question.content,
  //               optionA: _question.optionA,
  //               optionB: _question.optionB,
  //               optionC: _question.optionC,
  //               optionD: _question.optionD,
  //             },
  //           });
  //           //Add to mapping table
  //           await this.prismaService.mappingPart6Question.create({
  //             data: {
  //               questionId: createdQuestion.id,
  //               part6QuestionId: _part6Question.id,
  //             },
  //           });
  //         }),
  //       );
  //     }),
  //   );
  //   return 'Done';
  // }

  findAll() {
    return this.prismaService.part6.findMany({});
  }

  findOne(id: string) {
    return this.prismaService.part6.findFirst({ where: { id } });
  }

  update(id: string, updatePart6Dto: UpdatePart6Dto) {
    return `This action updates a #${id} part6`;
  }

  remove(id: string) {
    return this.prismaService.part6.delete({ where: { id } });
  }
}
