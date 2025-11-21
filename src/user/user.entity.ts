import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from '../booking/booking.entity';
import { Restaurant } from '../restaurant/restaurant.entity';

export enum Role {
  GUEST = 'GUEST',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  googleId: string;


  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.GUEST,
  })
  role: Role;

  @OneToMany(() => Booking, (b) => b.user)
  bookings: Booking[];

  @OneToMany(() => Restaurant, (r) => r.admin)
  adminRestaurants: Restaurant[];
}
