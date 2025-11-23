import { Module } from '@nestjs/common';



import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Saloon } from '../saloon/entities/saloon.entity';
import { Employee } from '../employee/entities/employee.entity';
import { ReviewController } from './reviews.controller';
import { ReviewService } from './reviews.service';
import { Customer } from '../customer/entities/customer.entity';
import { Appointment } from '../appointment/entities/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Saloon, Employee, Customer,Appointment])],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewsModule {}
