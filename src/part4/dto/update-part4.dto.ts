import { PartialType } from '@nestjs/mapped-types';
import { CreatePart4Dto } from './create-part4.dto';

export class UpdatePart4Dto extends PartialType(CreatePart4Dto) {}
