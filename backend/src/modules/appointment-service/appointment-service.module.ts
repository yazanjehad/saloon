import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentServiceEntity } from './entities/appointment-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentServiceEntity])],
  exports: [TypeOrmModule], // مهم لكي يستخدمه الـ AppointmentModule
})
export class AppointmentServiceModule {}
