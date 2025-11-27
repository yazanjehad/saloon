import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EmployeeWeeklySchedule } from './entities/employee-weekly-schedule.entity';
import { EmployeeWeeklyScheduleResponseDto } from './dto/response-employee-weekly.dto';
import { EmployeeWeeklyScheduleMessages } from 'src/common/error-messages';

@Injectable()
export class EmployeeWeeklyScheduleService {
  constructor(
    @InjectRepository(EmployeeWeeklySchedule)
    private readonly scheduleRepo: Repository<EmployeeWeeklySchedule>,
  ) {}

 async create(dto: any) {
  const schedule = this.scheduleRepo.create({
    day: dto.day,
    startTime: dto.startTime,
    endTime: dto.endTime,
    isWorking: dto.isWorking,
    employee: { id: dto.employeeId },
  });

  const saved: EmployeeWeeklySchedule = await this.scheduleRepo.save(schedule);

  const result = await this.scheduleRepo.findOne({
    where: { id: saved.id },
    relations: ['employee'],
  });

  if (!result) throw new NotFoundException(EmployeeWeeklyScheduleMessages.NOT_FOUND);

  return {
    message: EmployeeWeeklyScheduleMessages.CREATED,
    data: new EmployeeWeeklyScheduleResponseDto(result),
  };
}

  async update(id: number, dto: any) {
    const schedule = await this.scheduleRepo.findOne({
      where: { id },
      relations: ['employee'],
    });

    if (!schedule) throw new NotFoundException(EmployeeWeeklyScheduleMessages.NOT_FOUND);

    Object.assign(schedule, dto);

    const updated = await this.scheduleRepo.save(schedule);

    const result = await this.scheduleRepo.findOne({
      where: { id: updated.id },
      relations: ['employee'],
    });

    if (!result) throw new NotFoundException(EmployeeWeeklyScheduleMessages.NOT_FOUND);

    return {
      message: EmployeeWeeklyScheduleMessages.UPDATED,
      data: new EmployeeWeeklyScheduleResponseDto(result),
    };
  }

  async delete(id: number) {
    const schedule = await this.scheduleRepo.findOne({ where: { id } });

    if (!schedule) throw new NotFoundException(EmployeeWeeklyScheduleMessages.NOT_FOUND);

    await this.scheduleRepo.remove(schedule);

    return {
      message: EmployeeWeeklyScheduleMessages.DELETED,
      data: { id },
    };
  }

  async findOne(id: number) {
    const schedule = await this.scheduleRepo.findOne({
      where: { id },
      relations: ['employee'],
    });

    if (!schedule) throw new NotFoundException(EmployeeWeeklyScheduleMessages.NOT_FOUND);

    return {
      message: EmployeeWeeklyScheduleMessages.FETCHED,
      data: new EmployeeWeeklyScheduleResponseDto(schedule),
    };
  }

  async findByEmployee(employeeId: number) {
    const schedules = await this.scheduleRepo.find({
      where: { employee: { id: employeeId } },
      relations: ['employee'],
    });

    return {
      message: EmployeeWeeklyScheduleMessages.LIST_FETCHED,
      data: schedules.map(s => new EmployeeWeeklyScheduleResponseDto(s)),
    };
  }

  async findAll() {
    const schedules = await this.scheduleRepo.find({
      relations: ['employee'],
    });

    return {
      message: EmployeeWeeklyScheduleMessages.LIST_FETCHED,
      data: schedules.map(s => new EmployeeWeeklyScheduleResponseDto(s)),
    };
  }
}
