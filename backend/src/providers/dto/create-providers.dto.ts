import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateprovidersDto {
  @IsNotEmpty({ message: "name is required"})
  @IsString({ message: "name must be a string"})
  name: string;
  @IsOptional()
  @IsString({ message: "logo must be a string"})
  logo?: string;
  @IsNotEmpty({ message: "city is required"})
  @IsString({ message: "city must be a string"})
  city: string;
  @IsNotEmpty({ message: "address is required"})
  @IsString({ message: "address must be a string"})
  address: string;
  @IsString({ message: "email must be a string"})
  email: string;
  @IsNotEmpty({ message: "phone is required"})
  @IsString({ message: "phone must be a string"})
  phone: string;

  @IsOptional({ message: "whatsapp is required"})
  @IsString({ message: "whatsapp must be a string"})
  whatsapp?: string;
  @IsOptional()
  @IsString()
  facebook?: string;
  @IsOptional()
  @IsString()
  messenger?: string;
  @IsOptional()
  @IsString()
  observation?: string;
}
