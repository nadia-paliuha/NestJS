import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { Booking, BookingStatus } from './booking.entity';
import { TableEntity } from '../table/table.entity';
import { CheckAvailabilityDto } from './dto/check-availability.dto';
import { Restaurant } from '../restaurant/restaurant.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { User } from 'src/user/user.entity';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>,

    @InjectRepository(TableEntity)
    private tableRepository: Repository<TableEntity>,

    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAvailableTables(dto: CheckAvailabilityDto): Promise<TableEntity[]> {
    const { date, start_time, end_time, numGuests } = dto;

    if (end_time <= start_time) {
      throw new BadRequestException('Час завершення має бути пізніше часу початку');
    }

    const restaurant = await this.restaurantRepository.findOne({
      where: { id: 2 },
    });

    if (!restaurant) throw new BadRequestException('Ресторан не знайдено');

    const OPEN = restaurant.start_work.slice(0, 5);
    const CLOSE = restaurant.end_work.slice(0, 5); 

    if (start_time < OPEN || end_time > CLOSE) {
      throw new BadRequestException(
        `Бронювання можливе лише з ${OPEN} до ${CLOSE}`
      );
    }

    const now = new Date();
    const bookingStart = new Date(`${date}T${start_time}:00`);

    if (bookingStart < now) {
      throw new BadRequestException('Неможливо бронювати на час, що вже минув');
    }

    const tables = await this.tableRepository.find({
      where: { active: true, num_of_seats: MoreThanOrEqual(numGuests) },
      relations: ['bookings'],
    });

    const available = tables.filter((table) => {
      return !table.bookings.some((b) => {
        if (b.date !== date || b.status === BookingStatus.CANCELLED) return false;

        return (
          (start_time >= b.start_time && start_time < b.end_time) ||
          (end_time > b.start_time && end_time <= b.end_time) ||
          (start_time <= b.start_time && end_time >= b.end_time)
        );
      });
    });

    return available;
  }

  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingRepo.findOne({
      where: { id },
      relations: ['table', 'user'],
    });
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async createBooking(userId: number, dto: CreateBookingDto): Promise<Booking> {
    const table = await this.tableRepository.findOne({ where: { id: dto.tableId } });

    if (!table) throw new BadRequestException('Стіл не знайдено');

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new BadRequestException('Користувача не знайдено');

    const booking = this.bookingRepo.create({
      table: table,
      user: user,
      date: dto.date,
      start_time: dto.start_time,
      end_time: dto.end_time,
      numGuests: dto.numGuests,
      status: dto.status || BookingStatus.PENDING,
    });

    return this.bookingRepo.save(booking);
  }

  async delete(id: number): Promise<void> {
    const booking = await this.bookingRepo.findOne({ where: { id } });
    if (!booking) throw new NotFoundException('Booking not found');

    await this.bookingRepo.remove(booking);
  }

  async findByUser(userId: number, status?: string): Promise<Booking[]> {
    const where: any = { user: { id: userId } };
    if (status) where.status = status;

    return this.bookingRepo.find({
      where,
      relations: ['table'],
      order: { date: 'DESC', start_time: 'ASC' },
    });
  }

  async findAll(status?: string): Promise<Booking[]> {
    const where: any = {};
    if (status) {
        where.status = status;
    }

    return this.bookingRepo.find({
        where,
        relations: ['table', 'user'],
        order: { date: 'DESC', start_time: 'ASC' },
    });
  }

  async updateStatus(id: number, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const booking = await this.bookingRepo.findOne({
      where: { id },
      relations: ['table', 'user'],
    });

    if (!booking) throw new NotFoundException('Бронь не знайдена');

    if (booking.status === updateBookingDto.status) {
      throw new BadRequestException('Статус вже встановлено');
    }

    booking.status = updateBookingDto.status;
    return this.bookingRepo.save(booking);
  }

}
