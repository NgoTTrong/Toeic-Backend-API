import { Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Question, Topic } from '@prisma/client';
import * as dayjs from 'dayjs';

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
        category: {
          select: {
            name: true,
          },
        },
        part1Id: true,
        part1: {
          select: {
            id: true,
            title: true,
          },
        },
        part2Id: true,
        part2: {
          select: {
            id: true,
            title: true,
          },
        },
        part3Id: true,
        part3: {
          select: {
            id: true,
            title: true,
          },
        },
        part4Id: true,
        part4: {
          select: {
            id: true,
            title: true,
          },
        },
        part5Id: true,
        part5: {
          select: {
            id: true,
            title: true,
          },
        },
        part6Id: true,
        part6: {
          select: {
            id: true,
            title: true,
          },
        },
        part7Id: true,
        part7: {
          select: {
            id: true,
            title: true,
          },
        },
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
                question: {
                  include: {
                    topic: true,
                  },
                },
              },
            },
          },
        },
        part2: {
          include: {
            part2Questions: {
              include: {
                question: {
                  include: {
                    topic: true,
                  },
                },
              },
            },
          },
        },
        part3: {
          include: {
            part3Questions: {
              include: {
                groupPart3Questions: {
                  include: {
                    question: {
                      include: {
                        topic: true,
                      },
                    },
                  },
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
                  include: {
                    question: {
                      include: {
                        topic: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        part5: {
          include: {
            part5Questions: {
              include: {
                question: {
                  include: {
                    topic: true,
                  },
                },
              },
            },
          },
        },
        part6: {
          include: {
            part6Questions: {
              include: {
                groupPart6Questions: {
                  include: {
                    question: {
                      include: {
                        topic: true,
                      },
                    },
                  },
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
                  include: {
                    question: {
                      include: {
                        topic: true,
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
    let flattenQuestion: (Question & { topic: Topic })[] = [];
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
        (e) => e?.id == (result[i] as any)?.questionId,
      );
      if (idx != -1) {
        numOfCorrects +=
          flattenQuestion[idx]?.answer == (result[i] as any)?.option ? 1 : 0;
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
    let flattenQuestion: (Question & { topic: Topic })[] = [];
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

    let wrongTopics: { topicId: string; name: string }[] = [];
    let numOfCorrects = 0;
    for (let i = 0; i < _history?.result.length; i++) {
      const idx = flattenQuestion.findIndex(
        (e) => e?.id == (_history?.result[i] as any)?.questionId,
      );
      if (idx != -1) {
        numOfCorrects +=
          flattenQuestion[idx]?.answer == (_history?.result[i] as any)?.option
            ? 1
            : 0;
        if (
          flattenQuestion[idx]?.answer != (_history?.result[i] as any)?.option
        ) {
          if (
            !wrongTopics.some(
              (e) => e?.topicId == flattenQuestion?.[idx]?.topicId,
            )
          ) {
            wrongTopics.push({
              topicId: flattenQuestion?.[idx]?.topicId,
              name: flattenQuestion?.[idx]?.topic?.name,
            });
          }
        }
      }
    }
    return {
      exam,
      history: _history,
      numOfCorrects,
      wrongTopics,
    };
  }
  async getRandomChapter(topicId: string) {
    const chapters = await this.prismaService.chapter.findMany({
      where: { topicId },
    });
    return chapters[Math.floor(Math.random() * chapters?.length)] ?? null;
  }
  async receiveCoursePractive(historyId: string, userId: string) {
    const history = await this.prismaService.examHistory.findFirst({
      where: { id: historyId },
      include: {
        exam: true,
      },
    });
    const topicIds = history.wrongTopics.map((e: any) => e?.topicId as string);
    const chapters = await Promise.all(
      topicIds.map((topicId) => this.getRandomChapter(topicId)),
    );

    const practiceCourse = await this.prismaService.practiceCourse.create({
      data: {
        userId,
        name:
          'Practice - ' +
          history?.exam?.title +
          ' - ' +
          dayjs(new Date()).format('DD/MM/YYYY'),
        thumbnail: history?.exam?.thumbnail,
      },
    });
    await Promise.all(
      chapters
        .filter((chapter) => chapter != null)
        .map((chapter) =>
          this.prismaService.practiceCourseChapter.create({
            data: {
              chapterId: chapter?.id,
              practiceCourseId: practiceCourse?.id,
            },
          }),
        ),
    );
    return practiceCourse?.id;
  }

  getHistories(userId: string) {
    return this.prismaService.examHistory.findMany({
      where: {
        userId,
      },
      include: {
        exam: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
