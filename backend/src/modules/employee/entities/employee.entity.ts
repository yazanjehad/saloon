// src/modules/employee/employee.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Saloon } from '../../saloon/entities/saloon.entity';
import { EmployeeWeeklySchedule } from '../../employee-weekly-schedule/entities/employee-weekly-schedule.entity';
import { Service } from 'src/modules/services/entities/service.entity';
import { Review } from '../../reviews/entities/review.entity';

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

  @ManyToMany(() => Service, (service) => service.employees)
@JoinTable({
  name: 'employee_services',
  joinColumn: { name: 'employee_id', referencedColumnName: 'id' },
  inverseJoinColumn: { name: 'service_id', referencedColumnName: 'id' },
})
services: Service[];


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

  @OneToMany(() => Review, (review) => review.employee)
  reviews: Review[];
  @OneToMany(() => EmployeeWeeklySchedule, (schedule) => schedule.employee)
weeklySchedule: EmployeeWeeklySchedule[];

}
