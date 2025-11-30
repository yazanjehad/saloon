import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeWeeklySchedule } from './entities/employee-weekly-schedule.entity';
import { EmployeeWeeklyScheduleService } from './employee-weekly-schedule.service';
import { EmployeeWeeklyScheduleController } from './employee-weekly-schedule.controller';
import { Employee } from '../employee/entities/employee.entity';
import { BookingSlotModule } from '../booking-slot/booking-slot.module';
import { adminGuard } from '../../auth/guards/admin.gurad';



@Module({
  imports:[ TypeOrmModule.forFeature([EmployeeWeeklySchedule,Employee]),BookingSlotModule,],
  controllers: [EmployeeWeeklyScheduleController],
  providers: [EmployeeWeeklyScheduleService, adminGuard],
  exports: [EmployeeWeeklyScheduleService],
})
export class EmployeeWeeklyScheduleModule {}
