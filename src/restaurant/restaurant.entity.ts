import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { TableEntity } from '../table/table.entity';

@Entity('restaurant')
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ type: 'time' })
  start_work: string;

  @Column({ type: 'time' })
  end_work: string;

  @ManyToOne(() => User, (u) => u.adminRestaurants)
  admin: User;

  @OneToMany(() => TableEntity, (t) => t.restaurant)
  tables: TableEntity[];
}
