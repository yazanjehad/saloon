import { Controller, Get, Post, Param } from '@nestjs/common';
import { BookingSlotService } from './booking-slot.service';

@Controller('booking-slot')
export class BookingSlotController {
  constructor(private readonly bookingSlotService: BookingSlotService) {}

  @Post('generate/:employeeId')
  generateSlots(@Param('employeeId') employeeId: string) {
    return this.bookingSlotService.generateSlots(+employeeId);
  }

  
  @Get('get_slot_byEmpId/:employeeId')
  async getSlotsByEmployeeId(@Param('employeeId') employeeId: string) {
    const slots = await this.bookingSlotService.getSlotsByEmployeeId(+employeeId);
    return slots;
  }

  @Get('get_slot_byEmpId/:employeeId/service/:serviceId')
  async getSlotsByEmployeeIdAndServiceId(
    @Param('employeeId') employeeId: string,
    @Param('serviceId') serviceId: string,
  ) {
    const slots = await this.bookingSlotService.getSlotsByEmployeeIdAndServiceId(
      +employeeId,
      +serviceId,
    );
    return slots;

  }
@Get('available/:date/:employeeId/:serviceId')
  async getAvailableSlots(
    @Param('date') date: string, // التاريخ بصيغة YYYY-MM-DD
    @Param('employeeId') employeeId: string,
    @Param('serviceId') serviceId: string,
  ) {
    
    const slots = await this.bookingSlotService.getAvailableSlotsByCriteria(
      +employeeId,
      +serviceId,
      date,
    );
    return slots;
  }
}
