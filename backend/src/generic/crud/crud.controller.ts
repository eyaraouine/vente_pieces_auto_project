import {
  Body,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CrudService } from './crud.Service';
import PaginateDto from './dto/paginate.dto';

export class CrudController<T, createDto, UpdateDto> {
  constructor(private readonly service: CrudService<T, createDto, UpdateDto>) {}

  @Get('')
  async findAll(@Query() dto: PaginateDto): Promise<any> {
    const res = this.service.findAll(dto);
    const nb = this.service.getCount();
    return Promise.all([res, nb]).then((values) => {
      return {
        data: values[0],
        count: values[1],
      };
    });
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<T> {
    return this.service.findOne(id);
  }

  @Post('add')
  async create(@Body() Dto: createDto): Promise<T> {
    return this.service.create(Dto);
  }

  @Patch('edit/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() Dto: UpdateDto,
  ): Promise<T> {
    return this.service.update(id, Dto);
  }

  @Delete('delete/:id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ count: number }> {
    try {
      await this.service.delete(id);
      return { count: 1 };
    } catch (error) {
      throw new InternalServerErrorException("La suppression a échoué");
    }
  }
}
