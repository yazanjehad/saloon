import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { BookingSlot } from '../booking-slot/entities/booking-slot.entity';
import { Customer } from '../customer/entities/customer.entity';
import { Service } from '../services/entities/service.entity';
import { AppointmentServiceEntity } from '../appointment-service/entities/appointment-service.entity';

@Module({
    imports: [
    TypeOrmModule.forFeature([
      Appointment,
      BookingSlot,
      Customer,
      Service,
      AppointmentServiceEntity, 
    ]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
