import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Review } from '../reviews/entities/review.entity';
import { Appointment } from '../appointment/entities/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Review,Appointment])],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
