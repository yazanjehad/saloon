import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { Review } from '../../reviews/entities/review.entity';

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

@Entity('customers')
@Unique(['userName'])
@Unique(['email'])
@Unique(['phone'])
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'user_name' })
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  // add phon,gender,imge columns
  @Column()
  phone: string;

  @Column({ type: 'enum', enum: Gender, default: Gender.Male })
  gender: Gender;

  @Column({ name: 'image_url', nullable: true })
  imageUrl?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Review, (review) => review.customer)
  reviews: Review[];
}
