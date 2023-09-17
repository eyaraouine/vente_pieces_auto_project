import { IsNotEmpty, IsString } from "class-validator";

export class CreatecarsDto{
    @IsNotEmpty()
    @IsString()
    brand: string;
    @IsNotEmpty()
    @IsString() 
    model: string;
    @IsNotEmpty()
    @IsString()
    motorization: string;
}