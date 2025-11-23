import { Saloon } from '../../saloon/entities/saloon.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('saloon_services')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'duration_minutes', type: 'int' })
  durationMinutes: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ length: 10, default: 'USD' })
  currency: string;

  @Column({ length: 100, nullable: true })
  category?: string;

  @Column({ type: 'enum', enum: ['active', 'inactive'], default: 'active' })
  status: 'active' | 'inactive';

  @Column({ name: 'image_url', nullable: true })
  imageUrl?: string;

  @ManyToOne(() => Saloon, (saloon) => saloon.services)
  @JoinColumn({ name: 'saloon_id' })
  saloon: Saloon;
}
