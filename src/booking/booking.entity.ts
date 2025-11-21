import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { TableEntity } from '../table/table.entity';

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

@Entity('booking')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TableEntity, (t) => t.bookings)
  table: TableEntity;

  @ManyToOne(() => User, (u) => u.bookings)
  user: User;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time' })
  end_time: string;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;
}
