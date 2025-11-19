import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminSaloon } from './entities/admin.entity';
import { Saloon } from '../saloon/entities/saloon.entity';

// Module to encapsulate admin-related components
@Module({
  imports: [TypeOrmModule.forFeature([AdminSaloon,Saloon])],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [TypeOrmModule],
})
export class AdminModule {}
