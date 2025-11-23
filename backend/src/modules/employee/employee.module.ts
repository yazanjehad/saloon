import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { Saloon } from '../saloon/entities/saloon.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Employee } from './entities/employee.entity';
import { BookingSlot } from '../booking-slot/entities/booking-slot.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, Saloon,BookingSlot]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
  
})
export class EmployeeModule {}
