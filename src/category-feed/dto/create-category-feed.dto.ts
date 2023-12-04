import { IsString } from 'class-validator';

export class CreateCategoryFeedDto {
  @IsString()
  name: string;
  @IsString()
  color: string;
  @IsString()
  background: string;
}
