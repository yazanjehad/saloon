import { IsArray, ArrayNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAppointmentDto {
  @IsNumber()
  bookingSlotId: number;

  @IsNumber()
  customerId: number;

  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Number) // يحول العناصر إلى أرقام فعلية
  serviceIds: number[];
}
