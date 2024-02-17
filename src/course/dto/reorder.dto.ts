import { IsArray, IsString } from 'class-validator';

export class ReorderDto {
  @IsArray()
  reorderData: {
    id: number;
    position: number;
  }[];
}
