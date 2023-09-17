import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreatePieceDto } from './dto/create-piece.dto';
import { UpdatePieceDto } from './dto/update-piece.dto';
import { CarsService } from '../cars/cars.service';
import { Piece } from './entities/piece.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, SelectQueryBuilder } from 'typeorm';
import { CrudService } from '../generic/crud/crud.Service';
import SearchDto from './dto/search.dto';
import PaginateDto from 'src/generic/crud/dto/paginate.dto';
import { returnData } from './dto/return.dto';

@Injectable()
export class PieceService extends CrudService<
  Piece,
  CreatePieceDto,
  UpdatePieceDto
> {
  constructor(
    @InjectRepository(Piece)
    private piecesRepository: Repository<Piece>,
    private readonly carService: CarsService,
  ) {
    super(piecesRepository);
  }

  async add(createPieceDto: CreatePieceDto): Promise<Piece> {
    console.log(createPieceDto);
    const cars = await this.carService.getCarsByCriteria(
      createPieceDto.brand,
      createPieceDto.model,
      createPieceDto.motorization,
    );

    const newPiece: any = createPieceDto;
    newPiece.cars = cars;
    console.log(newPiece);
    return await this.piecesRepository.save(newPiece);
  }

  async updatePiece(id: number, dto: UpdatePieceDto): Promise<Piece> {
    const piece = await this.piecesRepository.findOne(id);
    if (!piece) {
      throw new BadGatewayException('piece not found');
    }
    const cars = await this.carService.getCarsByCriteria(
      dto.brand,
      dto.model,
      dto.motorization,
    );

    piece.cars = cars;
    return await this.piecesRepository.save(piece);
  }

  async getByProviderId(id: number): Promise<Piece[]> {
    return await this.piecesRepository.find({
      where: { provider: { id: id } },
    });
  }
  
  async getByCriteriaQuery(
    data: SearchDto,
    query: SelectQueryBuilder<Piece>,
  ): Promise<SelectQueryBuilder<Piece>> {
    const { brand, model, motorization, sortBy } = data;

    if (brand) {
      console.log(brand);
      query.andWhere('cars.brand = :brand', { brand: brand });
    }

    if (model) {
      query.andWhere('cars.model = :model', { model: model });
    }

    if (motorization) {
      query.andWhere('cars.motorization = :motorization', {
        motorization: motorization,
      });
    }
    switch (sortBy) {
      case 'IncreasingPrice':
        query.orderBy('pieces.price', 'ASC');
        break;
      case 'DecreasingPrice':
        query.orderBy('pieces.price', 'DESC');
        break;
      case 'AdditionDate':
        query.orderBy('pieces.createdAt', 'DESC');
        break;
      default:
        break;
    }
    return query;
  }

  async searchPieces(data: SearchDto): Promise<returnData> {
    let query = this.piecesRepository
      .createQueryBuilder('pieces')
      .leftJoinAndSelect('pieces.cars', 'cars')
      .leftJoinAndSelect('pieces.category', 'category')

    query = await this.getByCriteriaQuery(data, query);
    const res = await this.paginate(query, data);
    const count = await query.getCount();
    return { data: res, count: count };
  }

  async getByCategoryQuery(id: number): Promise<SelectQueryBuilder<Piece>> {
    const query = await this.piecesRepository
      .createQueryBuilder('pieces')
      .leftJoinAndSelect('pieces.subCategory', 'subCategory')
      .leftJoinAndSelect('pieces.category', 'category')
      .leftJoinAndSelect('pieces.cars', 'cars')
      .where('(subCategory.id = :categoryId OR category.id = :categoryId)', { categoryId: id })
    return query;
  }

  async searchPiecesByCategory(
    id: number,
    dto: SearchDto,
  ): Promise<returnData> {
    let query = await this.getByCategoryQuery(id);

    if (dto.brand || dto.sortBy) {
      query = await this.getByCriteriaQuery(dto, query);
    }
    const res = await this.paginate(query, dto);
    const count = await query.getCount();
    return { data: res, count: count };
  }
  async deleteByProviderId(providerId: string): Promise<void> {
     await this.piecesRepository.createQueryBuilder()
      .delete()
      .where("providerId = :providerId", { providerId })
      .execute();
  }
  async searchPiecesByCriteria(criteria: string, paginateDto: PaginateDto): Promise<returnData> {
    // Search by brand, model, motorization, carCode, category, subcategory, pieceCode, constructorReference
    const lowerCriteria = criteria.toLowerCase(); // Convert the criteria to lowercase
  
    const query = await this.piecesRepository
      .createQueryBuilder('piece')
      .innerJoinAndSelect('piece.cars', 'cars')
      .innerJoinAndSelect('piece.category', 'category')
      .innerJoinAndSelect('piece.subCategory', 'subCategory')
      .where('LOWER(cars.brand) LIKE :criteria', { criteria: `%${lowerCriteria}%` })
      .orWhere('LOWER(cars.model) LIKE :criteria', { criteria: `%${lowerCriteria}%` })
      .orWhere('LOWER(cars.motorization) LIKE :criteria', { criteria: `%${lowerCriteria}%` })
      .orWhere('LOWER(cars.carCode) LIKE :criteria', { criteria: `%${lowerCriteria}%` })
      .orWhere('LOWER(category.label) LIKE :criteria', { criteria: `%${lowerCriteria}%` })
      .orWhere('LOWER(subCategory.label) LIKE :criteria', { criteria: `%${lowerCriteria}%` })
      .orWhere('LOWER(piece.pieceCode) LIKE :criteria', { criteria: `%${lowerCriteria}%` })
      .orWhere('LOWER(piece.piece) LIKE :criteria', { criteria: `%${lowerCriteria}%` })
      .orWhere('LOWER(piece.constructorReference) LIKE :criteria', { criteria: `%${lowerCriteria}%` });
  
    const res = await this.paginate(query, paginateDto);
    const totalCount = await query.getCount();
    return {
      data: res,
      count: totalCount,
    };
  }
  
  


}
