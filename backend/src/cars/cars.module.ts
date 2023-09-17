import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsService } from './cars.service';
import { Cars } from './entities/cars.entity';

@Module({
  imports:[TypeOrmModule.forFeature(
    [Cars]
    )],
  controllers: [CarsController],
  providers: [CarsService],
  exports:[CarsService]
})
export class CarsModule {}
