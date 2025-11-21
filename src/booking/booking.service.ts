import { Injectable } from '@nestjs/common';

@Injectable()
export class BookingService {
  private bookings = ['Monday 4', 'Saturday 5'];

  getAllBookings() {
    return this.bookings;
  }
}
