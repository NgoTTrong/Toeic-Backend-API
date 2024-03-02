import { IsArray, IsString } from 'class-validator';

export class ReorderDto {
  @IsArray()
  reorderData: {
    id: string;
    position: number;
  }[];
}
