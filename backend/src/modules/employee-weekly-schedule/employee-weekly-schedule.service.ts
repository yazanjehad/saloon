import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeWeeklySchedule } from './entities/employee-weekly-schedule.entity';
import { CreateEmployeeWeeklyScheduleDto } from './dto/create-employee-weekly-schedule.dto';
import { UpdateEmployeeWeeklyScheduleDto } from './dto/update-employee-weekly-schedule.dto';
import { BookingSlot } from '../booking-slot/entities/booking-slot.entity';
import { BookingSlotService } from '../booking-slot/booking-slot.service';

@Injectable()
export class EmployeeWeeklyScheduleService {
  constructor(
    @InjectRepository(EmployeeWeeklySchedule)
    private readonly scheduleRepo: Repository<EmployeeWeeklySchedule>,

    private readonly bookingSlotService: BookingSlotService, // ✅ حقن الـ service فقط
  ) {}
  async create(dto: CreateEmployeeWeeklyScheduleDto) {
    // تحقق من التكرار
    const existing = await this.scheduleRepo.findOne({
      where: { employee: { id: dto.employee }, day: dto.day },
      relations: ['employee'],
    });
    if (existing)
      throw new BadRequestException(
        `Schedule already exists for ${dto.day} this date`,
      );

    const schedule = this.scheduleRepo.create({
      ...dto,
      employee: { id: dto.employee },
    });
    return await this.scheduleRepo.save(schedule);
  }

  async findAll() {
    return await this.scheduleRepo.find({
      relations: ['employee'],
    });
  }

  async findByEmployee(employeeId: number) {
    return await this.scheduleRepo.find({
      where: { employee: { id: employeeId } },
      relations: ['employee'],
    });
  }

  async findOne(id: number) {
    const schedule = await this.scheduleRepo.findOne({
      where: { id },
      relations: ['employee'],
    });

    if (!schedule) {
      throw new NotFoundException('Weekly schedule not found');
    }

    return schedule;
  }

  async update(id: number, dto: UpdateEmployeeWeeklyScheduleDto) {
    const schedule = await this.findOne(id);

    let shouldUpdateSlots = false;

    // Case: day is set to non-working
    if (dto.isWorking === false) {
      schedule.isWorking = false;
      schedule.startTime = null;
      schedule.endTime = null;
      shouldUpdateSlots = true;
    } 
    // Case: day is set to working with start and end time
    else if (dto.isWorking === true) {
      if (!dto.startTime || !dto.endTime) {
        throw new BadRequestException('startTime and endTime are required when isWorking = true');
      }
      schedule.isWorking = true;
      schedule.startTime = dto.startTime;
      schedule.endTime = dto.endTime;
      shouldUpdateSlots = true;
    } 
    // Case: update only times without specifying isWorking
    else if (dto.startTime || dto.endTime) {
      if (!dto.startTime || !dto.endTime) {
        throw new BadRequestException('Both startTime and endTime must be provided when updating times');
      }
      schedule.isWorking = true;
      schedule.startTime = dto.startTime;
      schedule.endTime = dto.endTime;
      shouldUpdateSlots = true;
    }

    // Save the updated schedule first
    await this.scheduleRepo.save(schedule);

    // If any changes affect the slots
    if (shouldUpdateSlots) {
      // Delete old slots for the day
      await this.bookingSlotService.deleteSlotsForDay(schedule.employee.id, schedule.day);

      // Generate new slots if the day is working
      if (schedule.isWorking) {
        await this.bookingSlotService.generateSlots(schedule.employee.id);
      }
    }

    return {
      message: 'Schedule updated successfully',
      schedule,
    };
  }

  async remove(id: number) {
    const schedule = await this.findOne(id);
    return await this.scheduleRepo.remove(schedule);
  }


}

// // مثال: تحديد تاريخ اليوم القادم الذي يوافق يوم الأسبوع
// function nextDateOfWeek(day: string): string {
//   const daysMap = { sun:0, mon:1, tue:2, wed:3, thu:4, fri:5, sat:6 };
//   const today = new Date();
//   const todayDay = today.getDay();
//   const targetDay = daysMap[day];
//   let diff = targetDay - todayDay;
//   if(diff < 0) diff += 7;
//   const result = new Date(today);
//   result.setDate(today.getDate() + diff);
//   return result.toISOString().split('T')[0]; // YYYY-MM-DD
// }
