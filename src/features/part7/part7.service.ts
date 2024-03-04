import { Injectable } from '@nestjs/common';
import { CreatePart7Dto } from './dto/create-part7.dto';
import { UpdatePart7Dto } from './dto/update-part7.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class Part7Service {
  constructor(private readonly prismaService: PrismaService) {}

  // async create(CreatePart7Dto: CreatePart7Dto) {
  //   //Create part 7
  //   const _part7 = await this.prismaService.part7.create({
  //     data: {
  //       thumbnail: CreatePart7Dto.thumbnail,
  //       introduction: CreatePart7Dto.introduction,
  //       numOfQuestions: CreatePart7Dto.questions.length,
  //     },
  //   });
  //   // Create part 7 child
  //   await Promise.all(
  //     CreatePart7Dto.questions.map(async (question) => {
  //       let _explain: Explain;
  //       // Create explain if exist
  //       if (question?.explain) {
  //         _explain = await this.prismaService.explain.create({
  //           data: question.explain,
  //         });
  //       }
  //       //Create part 7 question
  //       const _part7Question = await this.prismaService.part7Question.create({
  //         data: {
  //           imageUrls: question.imageUrls,
  //           part7Id: _part7.id,
  //           explainId: _explain?.id,
  //         },
  //       });
  //       // Create part 7 question childs
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
  //           await this.prismaService.mappingPart7Question.create({
  //             data: {
  //               questionId: createdQuestion.id,
  //               part7QuestionId: _part7Question.id,
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
    return this.prismaService.part7.findFirst({ where: { id } });
  }

  update(id: string, updatePart7Dto: UpdatePart7Dto) {
    return `This action updates a #${id} part7`;
  }

  remove(id: string) {
    return this.prismaService.part7.delete({ where: { id } });
  }
}
