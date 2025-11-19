// src/modules/saloon/entities/saloon.entity.ts
 import { AdminSaloon } from '../../admin/entities/admin.entity';
//import { Employee } from "../../employee/entities/employee.entity";
import { Service } from '../../services/entities/service.entity';


import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('saloons')
export class Saloon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'saloon_name' })
  name: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  phone: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  // Many-to-One relationship with AdminSaloon
  // Many saloons can belong to one admin
  @ManyToOne(() => AdminSaloon, (admin) => admin.saloons)
  @JoinColumn({ name: 'admin_id' }) 
  admin: AdminSaloon;

  // One-to-Many relationship with Employee
  // A saloon can have multiple employees
  // @OneToMany(() => Employee, (employee) => employee.saloon)
  // employees: Employee[];

  // @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // createdAt: Date;
  // @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  // updatedAt: Date;

  

  
  // @OneToMany(() => Service, (service: any) => service.saloon)
  // services: Service[];


}
