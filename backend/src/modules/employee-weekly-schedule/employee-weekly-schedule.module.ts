import { Module } from '@nestjs/common';
import { EmployeeWeeklyScheduleService } from './employee-weekly-schedule.service';
import { EmployeeWeeklyScheduleController } from './employee-weekly-schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../employee/entities/employee.entity';
import { EmployeeWeeklySchedule } from './entities/employee-weekly-schedule.entity';
import { BookingSlot } from '../booking-slot/entities/booking-slot.entity';

@Module({
  imports:[ TypeOrmModule.forFeature([EmployeeWeeklySchedule,Employee,BookingSlot])],
  controllers: [EmployeeWeeklyScheduleController],
  providers: [EmployeeWeeklyScheduleService],
  exports: [EmployeeWeeklyScheduleService],
  

})
export class EmployeeWeeklyScheduleModule {}
