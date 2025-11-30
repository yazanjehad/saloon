import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Saloon } from '../saloon/entities/saloon.entity';
import { BookingSlot } from '../booking-slot/entities/booking-slot.entity';
import { Review } from '../reviews/entities/review.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/jwt.constants';
import { EmployeeJwtStrategy } from 'src/auth/strategies/employee-jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, Saloon, BookingSlot, Review]),
    JwtModule.register({
      secret: jwtConstants.employeeSecret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeJwtStrategy],
  exports: [EmployeeService],
})
export class EmployeeModule {}
