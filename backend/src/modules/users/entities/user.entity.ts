import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';
// import { Salon } from '../../salons/entities/salon.entity';
// import { Booking } from '../../bookings/entities/booking.entity';
// import { Review } from '../../reviews/entities/review.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;


  @ManyToOne(() => Role, (role) => role.users)
  role: Role;


//   @OneToMany(() => Salon, (salon) => salon.owner)
//   salons: Salon[];


//   @OneToMany(() => Booking, (booking) => booking.user)
//   bookings: Booking[];


//   @OneToMany(() => Review, (review) => review.user)
//   reviews: Review[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
