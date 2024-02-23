import { IsString } from 'class-validator';

export class CreateFeedCategoryDto {
  @IsString()
  color: string;
  @IsString()
  background: string;
  @IsString()
  name: string;
}
