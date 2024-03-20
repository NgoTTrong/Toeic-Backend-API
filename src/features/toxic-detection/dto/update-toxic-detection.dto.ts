import { PartialType } from '@nestjs/mapped-types';
import { CreateToxicDetectionDto } from './create-toxic-detection.dto';

export class UpdateToxicDetectionDto extends PartialType(CreateToxicDetectionDto) {}
