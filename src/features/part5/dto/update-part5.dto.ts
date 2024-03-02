import { IsOptional, IsObject, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePart5Dto } from './create-part5.dto';

export class UpdatePart5Dto extends PartialType(CreatePart5Dto) {}
