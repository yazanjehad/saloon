import { Module } from '@nestjs/common';
import { SaloonService } from './saloon.service';
import { SaloonController } from './saloon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Saloon } from './entities/saloon.entity';
import { Employee } from '../employee/entities/employee.entity';
import { Service } from '../services/entities/service.entity';
import { AdminModule } from '../admin/admin.module';
import { AdminSaloon } from '../admin/entities/admin.entity';
import { Review } from '../reviews/entities/review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Saloon, Employee, Service, AdminSaloon, Review]),
    AdminModule,
  ],
  controllers: [SaloonController],
  providers: [SaloonService],
  exports: [SaloonService],
})
export class SaloonModule {}
