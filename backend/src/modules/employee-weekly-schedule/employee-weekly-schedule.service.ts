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
import { BookingSlotService } from '../booking-slot/booking-slot.service';
import { EmployeeWeeklyScheduleMessages } from 'src/common/error-messages';
import { EmployeeWeeklyScheduleResponseDto } from './dto/response-employee-weekly.dto';

@Injectable()
export class EmployeeWeeklyScheduleService {
  constructor(
    @InjectRepository(EmployeeWeeklySchedule)
    private readonly scheduleRepo: Repository<EmployeeWeeklySchedule>,

    private readonly bookingSlotService: BookingSlotService,
  ) {}

  async create(dto: CreateEmployeeWeeklyScheduleDto) {
    const schedule = this.scheduleRepo.create({
      day: dto.day,
      startTime: dto.startTime,
      endTime: dto.endTime,
      isWorking: dto.isWorking,
      employee: { id: dto.employeeId },
    });

    const saved = await this.scheduleRepo.save(schedule);

    const result = await this.scheduleRepo.findOne({
      where: { id: saved.id },
      relations: ['employee'],
    });

    if (!result)
      throw new NotFoundException(EmployeeWeeklyScheduleMessages.NOT_FOUND);

    return new EmployeeWeeklyScheduleResponseDto(result);
  }

  async findAll() {
    const schedules = await this.scheduleRepo.find({
      relations: ['employee'],
    });

    return schedules.map((s) => new EmployeeWeeklyScheduleResponseDto(s));
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

    if (!schedule)
      throw new NotFoundException(EmployeeWeeklyScheduleMessages.NOT_FOUND);

    return schedule; // RETURN RAW ENTITY (DTO handled in controller)
  }

  async update(id: number, dto: UpdateEmployeeWeeklyScheduleDto) {
    const schedule = await this.findOne(id);

    let shouldUpdateSlots = false;

    // CASE 1: Set to NOT WORKING
    if (dto.isWorking === false) {
      schedule.isWorking = false;
      schedule.startTime = null;
      schedule.endTime = null;
      shouldUpdateSlots = true;
    }
    // CASE 2: Set to WORKING
    else if (dto.isWorking === true) {
      if (!dto.startTime || !dto.endTime) {
        throw new BadRequestException(
          'startTime and endTime are required when isWorking = true',
        );
      }

      schedule.isWorking = true;
      schedule.startTime = dto.startTime;
      schedule.endTime = dto.endTime;
      shouldUpdateSlots = true;
    }
    // CASE 3: Update only times
    else if (dto.startTime || dto.endTime) {
      if (!dto.startTime || !dto.endTime) {
        throw new BadRequestException(
          'Both startTime and endTime must be provided when updating times',
        );
      }

      schedule.isWorking = true; // force
      schedule.startTime = dto.startTime;
      schedule.endTime = dto.endTime;
      shouldUpdateSlots = true;
    }

    // Save schedule
    await this.scheduleRepo.save(schedule);

    // UPDATE SLOTS IF REQUIRED
    if (shouldUpdateSlots) {
      await this.bookingSlotService.deleteSlotsForDay(
        schedule.employee.id,
        schedule.day,
        
      );

      if (schedule.isWorking) {
        await this.bookingSlotService.generateSlots(schedule.employee.id);
      }
    }

    return {
      message: 'Schedule updated successfully',
      data: new EmployeeWeeklyScheduleResponseDto(schedule),
    };
  }

  async remove(id: number) {
    const schedule = await this.findOne(id);
    await this.scheduleRepo.remove(schedule);

    return { deleted: true };
  }
}
