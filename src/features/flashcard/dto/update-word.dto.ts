import { IsOptional, IsString } from "class-validator";



export class UpdateWordDto {
    @IsString()
    @IsOptional()
    term: string;

    @IsString()
    @IsOptional()
    define: string;
}