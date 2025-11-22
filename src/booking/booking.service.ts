import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { TableEntity } from '../table/table.entity';
import { User } from '../user/user.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
    @InjectRepository(TableEntity)
    private readonly tableRepo: Repository<TableEntity>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<Booking[]> {
    return this.bookingRepo.find({relations: ['table', 'user']});
  }

  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingRepo.findOne({
      where: { id },
      relations: ['table', 'user'],
    });
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async create(userId: number, createDto: CreateBookingDto): Promise<Booking> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const table = await this.tableRepo.findOne({ where: { id: createDto.tableId } });
    if (!table) throw new NotFoundException('Table not found');

    const booking = this.bookingRepo.create({
      user,
      table,
      date: createDto.date,
      start_time: createDto.start_time,
      end_time: createDto.end_time,
      status: createDto.status,
    });

    return this.bookingRepo.save(booking);
  }

  async updateStatus(id: number, updateDto: UpdateBookingDto): Promise<Booking> {
    const booking = await this.bookingRepo.findOne({ where: { id } });
    if (!booking) throw new NotFoundException('Booking not found');

    booking.status = updateDto.status;
    return this.bookingRepo.save(booking);
  }

  async delete(id: number): Promise<void> {
    const booking = await this.bookingRepo.findOne({ where: { id } });
    if (!booking) throw new NotFoundException('Booking not found');

    await this.bookingRepo.remove(booking);
  }

  async findByUser(userId: number): Promise<Booking[]> {
    return this.bookingRepo.find({
      where: { user: { id: userId } },
      relations: ['table'],
      order: { date: 'DESC', start_time: 'ASC' },
    });
  }
}
