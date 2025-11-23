import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Saloon } from '../../saloon/entities/saloon.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { Customer } from '../../customer/entities/customer.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: [1, 2, 3, 4, 5], default: 1 })
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

  // @Column({ type: 'enum', enum: ['saloon', 'employee'], default: 'saloon' })
  // type: string;

  @Column({
    name: 'saloon_id',
    type: 'int',
    nullable: true,
  })
  saloonId: number;

  @Column({
    name: 'employee_id',
    type: 'int',
    nullable: true,
  })
  employeeId: number;

 

  //////////////////
  @ManyToOne(() => Saloon, (saloon) => saloon.reviews, { nullable: true })
  saloon: Saloon;

  @ManyToOne(() => Employee, (employee) => employee.reviews, { nullable: true })
  employee: Employee;
  @ManyToOne(() => Customer, (customer) => customer.reviews)
  customer: Customer;

  // @ManyToOne(()=> appoiment, (appoiment) => appoiment.reviews)
  // appoiment: appoiment
}
