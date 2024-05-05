import { PartialType } from '@nestjs/mapped-types';
import { CreatePracticeCourseDto } from './create-practice-course.dto';

export class UpdatePracticeCourseDto extends PartialType(CreatePracticeCourseDto) {}
