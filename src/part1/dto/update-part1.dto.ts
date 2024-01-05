import { PartialType } from '@nestjs/mapped-types';
import { CreatePart1Dto } from './create-part1.dto';

export class UpdatePart1Dto extends PartialType(CreatePart1Dto) {}
