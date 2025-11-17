// src/modules/admin/entities/admin.entity.ts
import { Saloon } from '../../saloon/entities/saloon.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('admin_saloons')
export class AdminSaloon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true, name: 'user_name' })
  userName: string;
 
  @Column({ unique: true })
  email: string;

  @Column({ length: 200 })
  password: string;
  
  @Column({ default: 'admin_saloons' })
  role: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

   @OneToMany(() => Saloon, (saloon) => saloon.admin, { cascade: true })
  saloons: Saloon[];
}