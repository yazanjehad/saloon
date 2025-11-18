import { Module } from '@nestjs/common';
import { SaloonService } from './saloon.service';
import { SaloonController } from './saloon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Saloon } from './entities/saloon.entity';
import { Employee } from '../employee/entities/employee.entity';
import { AdminSaloon } from '../admin/entities/admin.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Saloon, Employee, AdminSaloon])],
  controllers: [SaloonController],
  providers: [SaloonService],
  exports: [SaloonService],
})
export class SaloonModule {}
