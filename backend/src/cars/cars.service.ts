import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '../generic/crud/crud.Service';
import { Repository } from 'typeorm';
import { Cars } from './entities/cars.entity';
import { CreatecarsDto } from './dto/create-cars.dto';
import { UpdatecarsDto } from './dto/update-cars.dto';

@Injectable()
export class CarsService extends CrudService<
  Cars,
  CreatecarsDto,
  UpdatecarsDto
> {
  constructor(
    @InjectRepository(Cars)
    private carRepository: Repository<Cars>,
  ) {
    super(carRepository);
  }
  async getCarsByBrand(brand: string): Promise<Cars[]> {
    return this.carRepository.find({ where: { brand } });
  }

  async getCarBrands(): Promise<String[]> {
    const queryBuilder = this.carRepository.createQueryBuilder('car');
    queryBuilder.select('DISTINCT brand');
    const cars = await queryBuilder.getRawMany();
    return cars.map((car) => car.brand);
  }

  async getCarModels(brand: String): Promise<String[]> {
    const queryBuilder = this.carRepository.createQueryBuilder('car');
    queryBuilder.select('DISTINCT model');
    queryBuilder.where('car.brand = :brand', { brand });
    const cars = await queryBuilder.getRawMany();
    return cars.map((car) => car.model);
  }

  async getCarMotorizations(brand: String, model: String): Promise<String[]> {
    const queryBuilder = this.carRepository.createQueryBuilder('car');
    queryBuilder.select('DISTINCT motorization');
    queryBuilder.where('car.brand = :brand', { brand });
    queryBuilder.andWhere('car.model = :model', { model });
    const cars = await queryBuilder.getRawMany();
    return cars.map((car) => car.motorization);
  }

  async getCarsByModel(model: string): Promise<Cars[]> {
    return this.carRepository.find({ where: { model } });
  }

  async getCarsByMotorization(motorization: string): Promise<Cars[]> {
    return this.carRepository.find({ where: { motorization } });
  }

  async getCarsByCriteria(
    brand: string,
    model: string,
    motorization: string,
  ): Promise<Cars> {
    const queryBuilder = this.carRepository.createQueryBuilder('car');

    if (brand) {
      queryBuilder.andWhere('car.brand = :brand', { brand });
    }

    if (model) {
      queryBuilder.andWhere('car.model = :model', { model });
    }

    if (motorization) {
      queryBuilder.andWhere('car.motorization = :motorization', {
        motorization,
      });
    }

    return queryBuilder.getOne();
  }
  async getCarByCode(code:string):Promise<Cars>{
    const car = await this.carRepository
    .createQueryBuilder('car')
    .where('car.carCode = :code', { code })
    .getOne();
  return car;
  }
  async getCodeByCar(brand:string, model:string, motorization:string ):Promise<string>{
    const car = await this.carRepository
    .createQueryBuilder('car')
    .where('car.brand = :brand', { brand })
    .andWhere('car.model = :model',{model})
    .andWhere('car.motorization = :motorization',{motorization})
    .getOne();
    return car.carCode;
  
  }
}
