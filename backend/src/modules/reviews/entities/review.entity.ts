import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  Index,
} from 'typeorm';
import { Saloon } from '../../saloon/entities/saloon.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { Appointment } from '../../appointment/entities/appointment.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: [1, 2, 3, 4, 5] })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment?: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ name: 'appointment_id', type: 'int' })
  appointmentId: number;

  @ManyToOne(() => Saloon, (saloon) => saloon.reviews)
  @JoinColumn({ name: 'saloon_id' })
  saloon: Saloon;

  @ManyToOne(() => Employee, (employee) => employee.reviews)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @ManyToOne(() => Customer, (customer) => customer.reviews)
  customer: Customer;

  @Index({ unique: true })
  @ManyToOne(() => Appointment, (appointment) => appointment.reviews)
  @JoinColumn({ name: 'appointment_id' })
  appointment: Appointment;
}
