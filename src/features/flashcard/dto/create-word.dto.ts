import { IsOptional, IsString } from "class-validator";



export class CreateWordDto {
    @IsString()
    term: string;

    @IsString()
    define: string;
}