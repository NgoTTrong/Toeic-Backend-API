import { PartialType } from '@nestjs/mapped-types';
import { CreatePart2Dto } from './create-part2.dto';

export class UpdatePart2Dto extends PartialType(CreatePart2Dto) {}
