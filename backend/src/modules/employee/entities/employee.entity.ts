// src/modules/employee/employee.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Saloon } from '../../saloon/entities/saloon.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'user_name', unique: true })
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 200 })
  password: string;

  @Column({ length: 15 })
  phone: string;
  
  @ManyToOne(() => Saloon, (saloon) => saloon.employees, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  saloon: Saloon;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
