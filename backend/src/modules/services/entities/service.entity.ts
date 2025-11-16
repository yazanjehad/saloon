import { AdminSaloon } from 'src/modules/admin/entities/admin.entity';
import { Saloon } from '../../saloon/entities/saloon.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('saloon_services')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;
  // وصف الخدمة
  @Column({ type: 'text', nullable: true })
  description?: string;
  // مدة الخدمة بالدقائق
  @Column({ name: 'duration_minutes', type: 'int' })
  durationMinutes: number;
  //السعر وبكون 10 ارقام كحد اقصى
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
  //العملة
  @Column({ length: 10, default: 'USD' })
  currency: string;
  //نوع الخدمة
  @Column({ length: 100, nullable: true })
  category?: string;
  // حالة الخدمة: متاحة أو غير متاحة
  @Column({
    type: 'enum',
    enum: ['active', 'inactive'],
    default: 'active',
  })
  status: 'active' | 'inactive';
  // رابط صورة الخدمة
  @Column({ name: 'image_url', nullable: true })
  imageUrl?: string;

  //
  @ManyToOne(() => AdminSaloon, (admin) => admin.saloons)
  @JoinColumn({ name: 'admin_id' })
  admin: AdminSaloon;

  @ManyToOne(() => Saloon, (saloon) => saloon.services) // اسم العمود في جدول saloons
  @JoinColumn({ name: 'saloon_id' })
  saloon: Saloon;

}