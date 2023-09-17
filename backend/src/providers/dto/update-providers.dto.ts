import { PartialType } from "@nestjs/mapped-types";
import { CreateprovidersDto } from "./create-providers.dto";

export class UpdateprovidersDto extends PartialType(CreateprovidersDto){}