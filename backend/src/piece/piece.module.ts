import { Module } from '@nestjs/common';
import { PieceService } from './piece.service';
import { PieceController } from './piece.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Piece } from './entities/piece.entity';
import { CarsModule } from '../cars/cars.module';
import { CategoriesModule } from '../categories/categories.module';
import { Cars } from '../cars/entities/cars.entity';
import { Categories } from '../categories/entities/categories.entity';
import { ProvidersModule } from '../providers/providers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Piece, Cars, Categories]),
    CarsModule,
    CategoriesModule,
    ProvidersModule,
  ],
  controllers: [PieceController],
  providers: [PieceService]
})
export class PieceModule {}
