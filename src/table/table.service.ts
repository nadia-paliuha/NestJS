import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableEntity } from './table.entity';
import { Restaurant } from '../restaurant/restaurant.entity';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(TableEntity)
    private readonly tableRepo: Repository<TableEntity>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,
  ) {}

  findAll(): Promise<TableEntity[]> {
    return this.tableRepo.find({ relations: ['restaurant'] });
  }

  async findOne(id: number): Promise<TableEntity> {
    const table = await this.tableRepo.findOne({
      where: { id },
      relations: ['restaurant'],
    });
    if (!table) throw new NotFoundException('Table not found');
    return table;
  }

  async create(createDto: CreateTableDto): Promise<TableEntity> {
    const restaurant = await this.restaurantRepo.findOne({
        where: { id: createDto.restaurantId },
    });
    if (!restaurant) throw new NotFoundException('Restaurant not found');

    const table = this.tableRepo.create({
        number: createDto.number,
        num_of_seats: createDto.num_of_seats,
        location: createDto.location,
        active: createDto.active,
        restaurant: restaurant,
    });
    
    return this.tableRepo.save(table);
  }

  async update(id: number, updateDto: UpdateTableDto): Promise<TableEntity> {
    const table = await this.tableRepo.findOne({ where: { id } });
    if (!table) throw new NotFoundException('Table not found');
    if (updateDto.restaurantId) {
        const restaurant = await this.restaurantRepo.findOne({
            where: { id: updateDto.restaurantId },
        });
        if (!restaurant) throw new NotFoundException('Restaurant not found');
        (table as any).restaurant = restaurant; 
        delete updateDto.restaurantId; 
    }
    Object.assign(table, updateDto); 
    
    return this.tableRepo.save(table);
  }

  async delete(id: number): Promise<void> {
    const table = await this.tableRepo.findOne({ where: { id } });
    if (!table) throw new NotFoundException('Table not found');

    await this.tableRepo.remove(table);
  }
}
