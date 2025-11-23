import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';

@Entity('employee_weekly_schedule')
@Unique(['employee' ]) // يمنع تكرار نفس الموظف ونفس التاريخ
export class EmployeeWeeklySchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'] })
  day: string;

  @Column({ name: 'start_time', type: 'time', nullable: true })
  startTime: string;

  @Column({ name: 'end_time', type: 'time', nullable: true })
  endTime: string;

  @Column({ default: true })
  isWorking: boolean;

  // @Column({ type: 'date' })
  // date: string; // التاريخ الفعلي لليوم

  @ManyToOne(() => Employee, (employee) => employee.weeklySchedule, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
