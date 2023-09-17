import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCategoriesDto{
    @IsString()
    @IsOptional()
    label: string;
    @IsOptional()
    @IsString()
    image: string;
    @IsNumber()
    @IsOptional()
    parent:number;
}