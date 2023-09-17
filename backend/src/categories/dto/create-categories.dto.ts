import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCategoriesDto{

    @IsString()
    @IsNotEmpty()
    label: string;
    @IsNotEmpty()
    image: string;
    @IsOptional()
    @IsNumber()
    parent:number;

}