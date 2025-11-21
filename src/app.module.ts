import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { BookingModule } from './booking/booking.module';
import { TableModule } from './table/table.module';

@Module({
  imports: [UserModule, RestaurantModule, BookingModule, TableModule],
})
export class AppModule {}
