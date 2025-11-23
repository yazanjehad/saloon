import { Module } from '@nestjs/common';
import { BookingSlotService } from './booking-slot.service';
import { BookingSlotController } from './booking-slot.controller';
import { BookingSlot } from './entities/booking-slot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../employee/entities/employee.entity';
import { Service } from '../services/entities/service.entity';
import { EmployeeWeeklySchedule } from '../employee-weekly-schedule/entities/employee-weekly-schedule.entity';

@Module({
   imports: [TypeOrmModule.forFeature([BookingSlot,Employee,Service,EmployeeWeeklySchedule])],
  controllers: [BookingSlotController],
  providers: [BookingSlotService],
  exports:[BookingSlotService]
})
export class BookingSlotModule {}

// INSERT INTO appointments
// (customer_id, employee_id, service_id, slot_id, appointment_date, start_time, end_time, status)
// VALUES
// (1, 1, 3, 10, '2025-11-20', '10:00', '10:30', 'confirmed');