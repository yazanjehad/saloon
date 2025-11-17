import { Module } from '@nestjs/common';
import { SaloonService } from './saloon.service';
import { SaloonController } from './saloon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Saloon } from './entities/saloon.entity';
import { Employee } from '../employee/entities/employee.entity';
import { Service } from '../services/entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Saloon, Employee,Service])],
  controllers: [SaloonController],
  providers: [SaloonService],
  exports: [SaloonService],
})
export class SaloonModule {}
