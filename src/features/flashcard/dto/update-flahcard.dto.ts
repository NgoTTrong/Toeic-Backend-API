import { PartialType } from '@nestjs/mapped-types';
import { CreateFlashCardDto } from './create-flashcard.dto';

export class UpdateFlashCardDto extends PartialType(CreateFlashCardDto) {}
