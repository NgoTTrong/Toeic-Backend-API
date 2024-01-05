import { PartialType } from '@nestjs/mapped-types';
import { CreatePart6Dto } from './create-part6.dto';

export class UpdatePart6Dto extends PartialType(CreatePart6Dto) {}
