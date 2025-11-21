import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { BookingModule } from './booking/booking.module';
import { TableModule } from './table/table.module';
import { ormConfig } from '../ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    UserModule,
    RestaurantModule,
    BookingModule,
    TableModule,
    AuthModule,
  ],
})
export class AppModule {}
