import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeWeeklySchedule } from './entities/employee-weekly-schedule.entity';

@Injectable()
export class EmployeeWeeklyScheduleService {
  constructor(
    @InjectRepository(EmployeeWeeklySchedule)
    private readonly scheduleRepo: Repository<EmployeeWeeklySchedule>,
  ) {}
  async create(dto: any) {
    // تحقق من التكرار
    const existing = await this.scheduleRepo.findOne({
      where: { employee: { id: dto.employee }, date: dto.date }
    });
    if (existing) throw new BadRequestException('Schedule already exists for this date');

    const schedule = this.scheduleRepo.create(dto);
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

  async update(id: number, dto: any) {
    const schedule = await this.findOne(id);
    Object.assign(schedule, dto);
    return await this.scheduleRepo.save(schedule);
  }

  async remove(id: number) {
    const schedule = await this.findOne(id);
    return await this.scheduleRepo.remove(schedule);
  }
}
