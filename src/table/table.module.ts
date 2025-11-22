import { Module } from '@nestjs/common';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableEntity } from './table.entity';
import { Restaurant } from '../restaurant/restaurant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TableEntity, Restaurant])
  ],
  controllers: [TableController],
  providers: [TableService],
})
export class TableModule {}
