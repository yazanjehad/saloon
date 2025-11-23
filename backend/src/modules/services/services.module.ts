import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Saloon } from '../saloon/entities/saloon.entity';
import { BookingSlot } from '../booking-slot/entities/booking-slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service,Saloon,BookingSlot])],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
