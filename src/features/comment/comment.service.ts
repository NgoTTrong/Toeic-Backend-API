import { BadRequestException, Injectable } from '@nestjs/common';
import { Comment } from './dto/comment.dto';
import { TransformerService } from 'src/features/transformerService/transformer.service';

let SampleCommentsData: Comment[] = [
  {
    id: 1,
    level: 0,
    username: 'user1',
    date: '2024-02-22T12:00:00Z',
    content: 'This is the first comment!',
  },
  {
    id: 2,
    level: 1,
    username: 'user2',
    date: '2024-02-22T12:05:00Z',
    content: 'Replying to the first comment.',
  },
  {
    id: 3,
    level: 0,
    username: 'user3',
    date: '2024-02-22T12:10:00Z',
    content: 'Another top-level comment.',
  },
];
let currentId: number = SampleCommentsData.length;

@Injectable()
export class CommentService {
  constructor(private readonly transformersService: TransformerService) {}

  async create(createComment: Comment): Promise<Comment> {
    try {
      const label = await this.transformersService.classifyText(
        createComment.content,
      );

      const nextId = currentId + 1;
      createComment.id = nextId;

      currentId += 1;
      SampleCommentsData.push(createComment);
      if (label !== 'NEG') {
        return createComment;
      } else {
        throw new BadRequestException('Comment content is considered negative');
      }
    } catch (error) {
      throw new BadRequestException('Error classifying comment:', error);
    }
  }

  findAll() {
    return SampleCommentsData;
  }

  findOne(id: number): Comment {
    return SampleCommentsData.find((comment) => comment.id === id);
  }

  update(id: number, updatedComment: Comment): Comment {
    const commentIndex = SampleCommentsData.findIndex(
      (comment) => comment.id === id,
    );
    if (commentIndex !== -1) {
      SampleCommentsData[commentIndex] = {
        ...SampleCommentsData[commentIndex],
        ...updatedComment,
      };
      return SampleCommentsData[commentIndex];
    }
    return undefined;
  }

  remove(id: number): boolean {
    const initialLength = SampleCommentsData.length;
    SampleCommentsData = SampleCommentsData.filter(
      (comment) => comment.id !== id,
    );
    return SampleCommentsData.length !== initialLength;
  }
}
