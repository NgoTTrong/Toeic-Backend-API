import { IsString } from 'class-validator';

export class AttachmentCourseDto {
  @IsString()
  url: string;
}
