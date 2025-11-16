import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminSaloon } from './entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Saloon } from '../saloon/entities/saloon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminSaloon,Saloon])],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
