import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Column,
} from 'typeorm';
import { BookingSlot } from '../../booking-slot/entities/booking-slot.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { Saloon } from '../../saloon/entities/saloon.entity';
import {  AppointmentServiceEntity } from '../../appointment-service/entities/appointment-service.entity';
import { Review } from '../../reviews/entities/review.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BookingSlot, (slot) => slot.appointments)
  @JoinColumn({ name: 'booking_slot_id' })
  bookingSlot: BookingSlot;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @ManyToOne(() => Saloon)
  @JoinColumn({ name: 'saloon_id' })
  saloon: Saloon;

  @Column({
    type: 'enum',
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  })
  status: string;

  @OneToMany(() => AppointmentServiceEntity, (as) => as.appointment)
  services: AppointmentServiceEntity[];

  @OneToMany(() => Review, (review) => review.appointment)
  reviews: Review[];
}
