import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { FlashCardService } from "./flashcard.service";
import { CreateFlashCardDto } from "./dto/create-flashcard.dto";
import { GetUser, Public } from "src/core/decorators";
import { Payload } from 'src/core/type/jwt.payload';
import { CreateWordDto } from "./dto/create-word.dto";
import { UpdateFlashCardDto } from "./dto/update-flahcard.dto";


@Controller('flashcard')
export class FlashcardController{
    constructor(private readonly flashcardService: FlashCardService){

    }

    @Post('/create')
    create(@Body() createFlashCardDto: CreateFlashCardDto, @GetUser() user: Payload){
        return this.flashcardService.create(createFlashCardDto,user.id)
    }

    @Public()
    @Post('/create-word/:id')
    createWord(@Body() createWordDto: CreateWordDto, @Param('id') id: string){
        return this.flashcardService.createWord(id,createWordDto)
    }

    
    @Get()
    findAll(@GetUser() user: Payload){
        return this.flashcardService.findAll(user.id);
    }

    @Public()
    @Put(':id')
    updateFlashcard(@Param('id') id: string, @Body() updateFlashCardDto: UpdateFlashCardDto){
        return this.flashcardService.update(id,updateFlashCardDto)
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.flashcardService.findOne(id)
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.flashcardService.remove(id)
    }


}