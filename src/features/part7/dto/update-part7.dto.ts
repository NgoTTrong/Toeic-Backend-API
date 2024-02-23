import { PartialType } from '@nestjs/mapped-types';
import { CreatePart7Dto } from './create-part7.dto';

export class UpdatePart7Dto extends PartialType(CreatePart7Dto) {}
