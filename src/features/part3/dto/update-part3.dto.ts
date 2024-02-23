import { PartialType } from '@nestjs/mapped-types';
import { CreatePart3Dto } from './create-part3.dto';

export class UpdatePart3Dto extends PartialType(CreatePart3Dto) {}
