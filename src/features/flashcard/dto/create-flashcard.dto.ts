import { IsOptional, IsString } from "class-validator";



export class CreateFlashCardDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;
}