import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import PaginateDto from './dto/paginate.dto';

@Injectable()
export abstract class CrudService<T, createDto, UpdateDto> {
  constructor(private readonly repository: Repository<T>) {}
    
  async getCount(): Promise<number> {
    return await this.repository.count();
  }

  async getCountWithQuery(cond: string, deleted?: boolean): Promise<number> {
    const query = this.repository.createQueryBuilder();
    if (deleted) {
      query.withDeleted();
    }
    query.where(cond);
    return await query.getCount();
  }

  async findAll(dto : PaginateDto): Promise<T[]> {
    let { page, take } = dto;
    page = page ?? 1;
    take = take ?? 4; 
    try {
      return this.repository.find({
        skip: ((page - 1) * take) as number,
        take: take,
      });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async paginate(query, dto: PaginateDto): Promise<T[]> {
    let { page, take } = dto;
    page = page ?? 1;
    take = take ?? 4;
    try {
      query.skip((page - 1) * take);
      query.take(take);
      return await query.getMany();
    } catch (error) {
      console.log(error);
    }
  }

  async findAllWithQuery(
    dto : PaginateDto,
    cond: string,
    deleted?: boolean,
  ): Promise<T[]> {
    try {
      const query = this.repository.createQueryBuilder();
      if (deleted) {
        query.withDeleted();
      }
      query.where(cond);
      console.log(this.paginate(query, dto)) 
      return this.paginate(query, dto);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async create(Dto: createDto): Promise<T> {
    return await this.repository.save(Dto as DeepPartial<T>);
  }

  async addEntity(entity: T): Promise<T> {
    return await this.repository.save(entity as DeepPartial<T>);
  }

  async findOne(id: number, deleted?: boolean){
    try {
      if (deleted) {
        return await this.repository.findOne({ where: {id : id}, withDeleted: true, loadRelationIds:true });
      }
      return await this.repository.findOne({ where: {id : id}});
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateDto: UpdateDto): Promise<T> {
    let entity = await this.repository.findOne(id);
    if (!entity) throw new NotFoundException();
    entity = {...entity, ...updateDto};
    console.log(entity);
    return await this.repository.save(entity as DeepPartial<T>);
  }

  async delete(id: number): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
  async softDelete(id: number) {
    try {
     await this.repository.softDelete(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
  async restore(id: number) {
    return await this.repository.restore(id);
  }
}
