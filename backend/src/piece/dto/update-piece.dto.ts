import { PartialType } from '@nestjs/mapped-types';
import { CreatePieceDto } from './create-piece.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdatePieceDto extends PartialType(CreatePieceDto) {
   
}


