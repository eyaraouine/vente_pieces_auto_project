import { IsNotEmpty } from "class-validator";

export default class CreateUserDto {
    @IsNotEmpty()
    id: number;
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    role: string;
}