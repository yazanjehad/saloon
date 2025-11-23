import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingSlotService } from './booking-slot.service';
import { CreateBookingSlotDto } from './dto/create-booking-slot.dto';
import { UpdateBookingSlotDto } from './dto/update-booking-slot.dto';

@Controller('booking-slot')
export class BookingSlotController {
  constructor(private readonly bookingSlotService: BookingSlotService) {}

@Post('generate/:employeeId')
generateSlots(@Param('employeeId') employeeId: string) {
  return this.bookingSlotService.generateSlots(+employeeId);
}
}
