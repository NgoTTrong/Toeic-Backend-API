import { IsArray } from "class-validator";

export class CreateCourseCategoryDto {
    @IsArray()
    names: string[]
}
