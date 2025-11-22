import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Restaurant } from '../restaurant/restaurant.entity';
import { Booking } from '../booking/booking.entity';

@Entity('tables')
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column()
  num_of_seats: number;

  @ManyToOne(() => Restaurant, (r) => r.tables)
  restaurant: Restaurant;

  @OneToMany(() => Booking, (b) => b.table)
  bookings: Booking[];
}
