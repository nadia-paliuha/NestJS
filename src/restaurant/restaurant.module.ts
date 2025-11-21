import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './restaurant.entity';
import { RestaurantService } from './restaurant.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
