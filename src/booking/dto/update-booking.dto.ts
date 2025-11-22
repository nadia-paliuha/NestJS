import { IsEnum } from 'class-validator';
import { BookingStatus } from '../booking.entity';

export class UpdateBookingDto {
  @IsEnum(BookingStatus)
  status: BookingStatus;
}