// src/modules/admin-saloon/entities/admin-saloon.entity.ts
import { Saloon } from 'src/modules/saloon/entities/saloon.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('admin_saloons')
export class AdminSaloon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userName: string;

  @Column({ name: 'first_name' })
  firsrName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 200 })
  password: string;

   @OneToMany(() => Saloon, (saloon) => saloon.admin, { cascade: true })
  saloons: Saloon[];
}
