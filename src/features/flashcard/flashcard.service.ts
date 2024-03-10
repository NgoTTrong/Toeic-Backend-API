import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateFlashCardDto } from "./dto/update-flahcard.dto";
import { CreateWordDto } from "./dto/create-word.dto";



@Injectable()

export class FlashCardService {
    constructor(private readonly prismaService: PrismaService){
        
    }

    async create(title: string, userId: string){
        return this.prismaService.flashCard.create({
            data:{
                title: title,
                creatorId: userId
            }
        })
    }

    async findAll(userId: string){
        return this.prismaService.flashCard.findMany({
            where:{
                creatorId: userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    async findOne (id: string, userId: string){
        return this.prismaService.flashCard.findFirst({
            where:{
                id, creatorId: userId
            }
        })
    }

    async update (id: string , updateFlashCardDto: UpdateFlashCardDto){
        return this.prismaService.flashCard.update({
            where: {id},
            data: updateFlashCardDto
        })
    }


    async remove (id: string)
    {
        return this.prismaService.flashCard.delete({
            where: {id}
        })
    }

    async createWord(flashCardId: string, wordDto: CreateWordDto){
        const _word = await this.prismaService.word.create({
            data: {
                flashCardId: flashCardId,
                ...wordDto}
        })

        const _flashCard = await this.prismaService.flashCard.findFirst({
            where: {id: flashCardId}
        })

        return _flashCard;
    }
}