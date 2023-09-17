import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePieceDto {

    @IsNotEmpty({ message: "piece is required"})
    @IsString({ message: "piece must be a string"})
    piece: string;
    @IsNotEmpty({ message: "image is required"})
    image: string;
    @IsNotEmpty({ message: "price is required"})
    @IsNumber({},{message:"price must be a number"})
    price: number;
    @IsNotEmpty({ message: "description is required"})
    @IsString({ message: "description must be a string"})
    description: string;
    @IsNotEmpty({ message: "constructorReference is required"})
    @IsString({ message: "constructorReference must be a string"})
    constructorReference: string;
    @IsOptional()
    comments: string;
    @IsNotEmpty({ message: "brand is required"})
    brand: string;
    @IsNotEmpty({ message: "model is required"})
    @IsString({ message: "model must be a string"})
    model: string;
    @IsNotEmpty({ message: "motorization is required"})
    @IsString({ message: "motorization must be a string"})
    motorization: string;
    @IsNotEmpty({ message: "category is required"})
    @IsString({ message: "category must be a string"})
    category: string;
    @IsNotEmpty({ message: "subCategory is required"})
    @IsString({ message: "subCategory must be a string"})
    subCategory:string;
    @IsNotEmpty({ message: "provider is required"})
    @IsString({ message: "provider must be a string"})
    provider: string;
}
