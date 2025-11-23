import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminSaloon } from './entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Saloon } from '../saloon/entities/saloon.entity';
import { AuthModule } from '../../auth/auth.module';
import { EmployeeModule } from '../employee/employee.module';
import { SaloonModule } from '../saloon/saloon.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminSaloon, Saloon]),
    AuthModule ,EmployeeModule , SaloonModule , CustomerModule
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}


