import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { FlashCardService } from "./flashcard.service";
import { CreateFlashCardDto } from "./dto/create-flashcard.dto";
import { GetUser } from "src/core/decorators";
import { Payload } from 'src/core/type/jwt.payload';
import { CreateWordDto } from "./dto/create-word.dto";


@Controller('flashcard')
export class FlashcardController{
    constructor(private readonly flashcardService: FlashCardService){

    }

    @Post('/create')
    create(@Body() createFlashCardDto: CreateFlashCardDto, @GetUser() user: Payload){
        return this.flashcardService.create(createFlashCardDto.title,user.id)
    }

    @Post('/create-word/:id')
    createWord(@Body() createWordDto: CreateWordDto, @Param() id: string){
        return this.flashcardService.createWord(id,createWordDto)
    }

    @Get()
    findAll(@GetUser() user: Payload){
        return this.flashcardService.findAll(user.id);
    }

    @Get(':id')
    findOne(@Param() id: string, @GetUser() user: Payload){
        return this.flashcardService.findOne(id,user.id)
    }

    @Delete(':id')
    remove(@Param() id: string){
        return this.flashcardService.remove(id)
    }


}