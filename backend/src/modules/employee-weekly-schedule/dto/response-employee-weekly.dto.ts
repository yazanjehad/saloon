import { EmployeeWeeklySchedule } from '../entities/employee-weekly-schedule.entity';

export class EmployeeWeeklyScheduleResponseDto {
  id: number;
  day: string;
  startTime: string | null;
  endTime: string | null;
  isWorking: boolean;

  employee: {
    id: number;
    userName: string;
    email: string;
  } | null;   

  constructor(entity: EmployeeWeeklySchedule) {
    this.id = entity.id;
    this.day = entity.day;
    this.startTime = entity.startTime;
    this.endTime = entity.endTime;
    this.isWorking = entity.isWorking;

    this.employee = entity.employee
      ? {
          id: entity.employee.id,
          userName: entity.employee.userName,
          email: entity.employee.email,
        }
      : null;
  }
}
