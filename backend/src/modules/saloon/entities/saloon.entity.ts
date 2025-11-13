// src/modules/saloon/entities/saloon.entity.ts
 import { AdminSaloon } from 'src/modules/admin/entities/admin.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
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

  // كل صالون مرتبط بصاحب صالون واحد
  @ManyToOne(() => AdminSaloon, (admin) => admin.saloons)
  @JoinColumn({ name: 'admin_id' }) // اسم العمود في جدول saloons
  admin: AdminSaloon;
}
