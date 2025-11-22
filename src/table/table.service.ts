import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from './table.entity';
import { Restaurant } from '../restaurant/restaurant.entity';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private readonly tableRepo: Repository<Table>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,
  ) {}

  findAll(): Promise<Table[]> {
    return this.tableRepo.find({ relations: ['restaurant'] });
  }

  async findOne(id: number): Promise<Table> {
    const table = await this.tableRepo.findOne({
      where: { id },
      relations: ['restaurant'],
    });
    if (!table) throw new NotFoundException('Table not found');
    return table;
  }

  async create(data: Partial<Table>, restaurantId: number): Promise<Table> {
    const restaurant = await this.restaurantRepo.findOne({
      where: { id: restaurantId },
    });
    if (!restaurant) throw new NotFoundException('Restaurant not found');

    const table = this.tableRepo.create({ ...data, restaurant });
    return this.tableRepo.save(table);
  }

  async update(id: number, data: Partial<Table>): Promise<Table> {
    const table = await this.tableRepo.findOne({ where: { id } });
    if (!table) throw new NotFoundException('Table not found');

    Object.assign(table, data);
    return this.tableRepo.save(table);
  }

  async delete(id: number): Promise<void> {
    const table = await this.tableRepo.findOne({ where: { id } });
    if (!table) throw new NotFoundException('Table not found');

    await this.tableRepo.remove(table);
  }
}
