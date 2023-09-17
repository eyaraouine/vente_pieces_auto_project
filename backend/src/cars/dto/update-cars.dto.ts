import { IsOptional, IsString } from "class-validator";

export class UpdatecarsDto{
    @IsOptional()
    @IsString()
    brand?: string;
    @IsOptional()
    @IsString()
    model?: string;
    @IsOptional()
    @IsString()
    motorization?: string;
}