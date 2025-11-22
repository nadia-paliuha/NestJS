import { IsNotEmpty, IsDateString, IsEnum, IsNumber } from 'class-validator';
import { BookingStatus } from '../booking.entity';

export class CreateBookingDto {
  @IsNumber()
  tableId: number;

  @IsDateString()
  date: string;

  @IsNotEmpty()
  start_time: string;

  @IsNotEmpty()
  end_time: string;

  status: BookingStatus = BookingStatus.PENDING;
}