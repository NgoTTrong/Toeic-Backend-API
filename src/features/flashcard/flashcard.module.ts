import { Module } from "@nestjs/common";
import { FlashcardController } from "./flashcard.controller";
import { FlashCardService } from "./flashcard.service";



@Module({
    controllers:[FlashcardController],
    providers:[FlashCardService]
})

export class FlashCardModule{}