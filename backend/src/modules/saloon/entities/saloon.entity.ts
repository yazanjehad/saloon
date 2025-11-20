// src/modules/saloon/entities/saloon.entity.ts
import { AdminSaloon } from '../../admin/entities/admin.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { Service } from '../../services/entities/service.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
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
  imageUrl?: string;

  // add  description , openingHours, rating, latitude, longitude
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'opening_hours', nullable: true })
  openingHours?: string;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ type: 'double', nullable: true })
  latitude?: number;

  @Column({ type: 'double', nullable: true })
  longitude?: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => AdminSaloon, (admin) => admin.saloons)
  @JoinColumn({ name: 'admin_id' })
  admin: AdminSaloon;

  @OneToMany(() => Employee, (employee) => employee.saloon)
  employees: Employee[];

  @OneToMany(() => Service, (service) => service.saloon)
  services: Service[];
}
