import { Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Question } from '@prisma/client';

@Injectable()
export class ExamService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createExamDto: CreateExamDto, userId: string) {
    return this.prismaService.exam.create({
      data: { ...createExamDto, creatorId: userId },
    });
  }

  findAll(userId: string) {
    return this.prismaService.exam.findMany({
      where: {
        creatorId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        title: true,
        id: true,
        isPublished: true,
        introduction: true,
        thumbnail: true,
        categoryId: true,
        part1: {
          select: {
            title: true,
            id: true,
          },
        },
        part2: {
          select: {
            title: true,
            id: true,
          },
        },
        part3: {
          select: {
            title: true,
            id: true,
          },
        },
        part4: {
          select: {
            title: true,
            id: true,
          },
        },
        part5: {
          select: {
            title: true,
            id: true,
          },
        },
        part6: {
          select: {
            title: true,
            id: true,
          },
        },
        part7: {
          select: {
            title: true,
            id: true,
          },
        },
      },
    });
  }
  findAllByUser() {
    return this.prismaService.exam.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
  }
  findOne(id: string) {
    return this.prismaService.exam.findFirst({
      where: {
        id,
      },
      select: {
        title: true,
        id: true,
        isPublished: true,
        introduction: true,
        categoryId: true,
        thumbnail: true,
      },
    });
  }
  findOneDetail(id: string) {
    return this.prismaService.exam.findFirst({
      where: {
        id,
      },
      select: {
        title: true,
        id: true,
        isPublished: true,
        introduction: true,
        categoryId: true,
        thumbnail: true,
        part1: {
          select: {
            title: true,
            id: true,
            part1Questions: {
              include: {
                question: {
                  select: {
                    id: true,
                    optionA: true,
                    optionB: true,
                    optionC: true,
                    optionD: true,
                    content: true,
                  },
                },
              },
            },
          },
        },
        part2: {
          select: {
            title: true,
            id: true,
            part2Questions: {
              include: {
                question: {
                  select: {
                    id: true,
                    optionA: true,
                    optionB: true,
                    optionC: true,
                    optionD: true,
                    content: true,
                  },
                },
              },
            },
          },
        },
        part3: {
          select: {
            title: true,
            id: true,
            part3Questions: {
              include: {
                groupPart3Questions: {
                  include: {
                    question: {
                      select: {
                        id: true,
                        optionA: true,
                        optionB: true,
                        optionC: true,
                        optionD: true,
                        content: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        part4: {
          select: {
            title: true,
            id: true,
            part4Questions: {
              include: {
                groupPart4Questions: {
                  include: {
                    question: {
                      select: {
                        id: true,
                        optionA: true,
                        optionB: true,
                        optionC: true,
                        optionD: true,
                        content: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        part5: {
          select: {
            title: true,
            id: true,
            part5Questions: {
              include: {
                question: {
                  select: {
                    id: true,
                    optionA: true,
                    optionB: true,
                    optionC: true,
                    optionD: true,
                    content: true,
                  },
                },
              },
            },
          },
        },
        part6: {
          select: {
            title: true,
            id: true,
            part6Questions: {
              include: {
                groupPart6Questions: {
                  include: {
                    question: {
                      select: {
                        id: true,
                        optionA: true,
                        optionB: true,
                        optionC: true,
                        optionD: true,
                        content: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        part7: {
          select: {
            title: true,
            id: true,
            part7Questions: {
              include: {
                groupPart7Questions: {
                  include: {
                    question: {
                      select: {
                        id: true,
                        optionA: true,
                        optionB: true,
                        optionC: true,
                        optionD: true,
                        content: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  update(id: string, updateExamDto: UpdateExamDto) {
    return this.prismaService.exam.update({
      where: { id },
      data: {
        ...updateExamDto,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} exam`;
  }

  async submitExam(
    userId: string,
    examId: string,
    result: { questionId: string; option: 'A' | 'B' | 'C' | 'D' }[],
    time: number,
  ) {
    const exam = await this.prismaService.exam.findFirst({
      where: {
        id: examId,
      },
      include: {
        part1: {
          include: {
            part1Questions: {
              include: {
                question: true,
              },
            },
          },
        },
        part2: {
          include: {
            part2Questions: {
              include: {
                question: true,
              },
            },
          },
        },
        part3: {
          include: {
            part3Questions: {
              include: {
                groupPart3Questions: { include: { question: true } },
              },
            },
          },
        },
        part4: {
          include: {
            part4Questions: {
              include: {
                groupPart4Questions: { include: { question: true } },
              },
            },
          },
        },
        part5: {
          include: {
            part5Questions: {
              include: {
                question: true,
              },
            },
          },
        },
        part6: {
          include: {
            part6Questions: {
              include: {
                groupPart6Questions: { include: { question: true } },
              },
            },
          },
        },
        part7: {
          include: {
            part7Questions: {
              include: {
                groupPart7Questions: { include: { question: true } },
              },
            },
          },
        },
      },
    });
    let flattenQuestion: Question[] = [];
    flattenQuestion = exam?.part1
      ? exam?.part1?.part1Questions?.map((e) => e?.question)
      : [...flattenQuestion];
    flattenQuestion = exam?.part2
      ? [
          ...flattenQuestion,
          ...exam?.part2?.part2Questions?.map((e) => e?.question),
        ]
      : [...flattenQuestion];
    flattenQuestion = exam?.part3
      ? [
          ...flattenQuestion,
          ...exam?.part3?.part3Questions?.reduce(
            (arr, e) => [
              ...arr,
              ...e?.groupPart3Questions?.map((e) => e?.question),
            ],
            [],
          ),
        ]
      : [...flattenQuestion];
    flattenQuestion = exam?.part4
      ? [
          ...flattenQuestion,
          ...exam?.part4?.part4Questions?.reduce(
            (arr, e) => [
              ...arr,
              ...e?.groupPart4Questions?.map((e) => e?.question),
            ],
            [],
          ),
        ]
      : [...flattenQuestion];
    flattenQuestion = exam?.part5
      ? [
          ...flattenQuestion,
          ...exam?.part5?.part5Questions?.map((e) => e?.question),
        ]
      : [...flattenQuestion];
    flattenQuestion = exam?.part6
      ? [
          ...flattenQuestion,
          ...exam?.part6?.part6Questions?.reduce(
            (arr, e) => [
              ...arr,
              ...e?.groupPart6Questions?.map((e) => e?.question),
            ],
            [],
          ),
        ]
      : [...flattenQuestion];
    flattenQuestion = exam?.part7
      ? [
          ...flattenQuestion,
          ...exam?.part7?.part7Questions?.reduce(
            (arr, e) => [
              ...arr,
              ...e?.groupPart7Questions?.map((e) => e?.question),
            ],
            [],
          ),
        ]
      : [...flattenQuestion];

    let numOfCorrects: number = 0;
    for (let i = 0; i < result.length; i++) {
      const idx = flattenQuestion.findIndex(
        (e) => e?.id == result[i]?.questionId,
      );
      if (idx != -1) {
        numOfCorrects +=
          flattenQuestion[idx]?.answer == result[i]?.option ? 1 : 0;
      }
    }
    return this.prismaService.examHistory.create({
      data: {
        userId,
        examId,
        result,
        numOfCorrects,
        time,
        score: Math.floor(
          (numOfCorrects * 1000) /
            (flattenQuestion?.length == 0 ? 1 : flattenQuestion?.length),
        ),
      },
    });
  }
  async getHistoryExam(historyId: string) {
    const _history = await this.prismaService.examHistory.findFirst({
      where: {
        id: historyId,
      },
    });
    const exam = await this.prismaService.exam.findFirst({
      where: {
        id: _history?.examId,
      },
      include: {
        part1: {
          include: {
            part1Questions: {
              include: { question: { include: { topic: true } } },
            },
          },
        },
        part2: {
          include: {
            part2Questions: {
              include: { question: { include: { topic: true } } },
            },
          },
        },
        part3: {
          include: {
            part3Questions: {
              include: {
                groupPart3Questions: {
                  include: { question: { include: { topic: true } } },
                },
              },
            },
          },
        },
        part4: {
          include: {
            part4Questions: {
              include: {
                groupPart4Questions: {
                  include: { question: { include: { topic: true } } },
                },
              },
            },
          },
        },
        part5: {
          include: {
            part5Questions: {
              include: { question: { include: { topic: true } } },
            },
          },
        },
        part6: {
          include: {
            part6Questions: {
              include: {
                groupPart6Questions: {
                  include: { question: { include: { topic: true } } },
                },
              },
            },
          },
        },
        part7: {
          include: {
            part7Questions: {
              include: {
                groupPart7Questions: {
                  include: { question: { include: { topic: true } } },
                },
              },
            },
          },
        },
      },
    });
    return {
      exam,
      history: _history,
    };
  }
}
