import { IsNotEmpty, IsDateString, IsEnum, IsNumber, } from 'class-validator';
import { BookingStatus } from '../booking.entity';
import { Type } from 'class-transformer';

export class CreateBookingDto {
  @Type(() => Number)
  @IsNumber()
  tableId: number;

  @IsNumber()
  numGuests: number;

  @IsDateString()
  date: string;

  @IsNotEmpty()
  start_time: string;

  @IsNotEmpty()
  end_time: string;

  status: BookingStatus = BookingStatus.PENDING;
}