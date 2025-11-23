import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingSlotDto } from './create-booking-slot.dto';

export class UpdateBookingSlotDto extends PartialType(CreateBookingSlotDto) {}
