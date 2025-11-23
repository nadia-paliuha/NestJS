import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { TableEntity } from '../table/table.entity';
import { User } from '../user/user.entity';
import { Restaurant } from 'src/restaurant/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, TableEntity, Restaurant, User])],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
