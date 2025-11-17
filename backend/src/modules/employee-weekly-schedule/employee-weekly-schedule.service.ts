import { Injectable } from '@nestjs/common';
import { CreateEmployeeWeeklyScheduleDto } from './dto/create-employee-weekly-schedule.dto';
import { UpdateEmployeeWeeklyScheduleDto } from './dto/update-employee-weekly-schedule.dto';

@Injectable()
export class EmployeeWeeklyScheduleService {
  create(createEmployeeWeeklyScheduleDto: CreateEmployeeWeeklyScheduleDto) {
    return 'This action adds a new employeeWeeklySchedule';
  }

  findAll() {
    return `This action returns all employeeWeeklySchedule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employeeWeeklySchedule`;
  }

  update(id: number, updateEmployeeWeeklyScheduleDto: UpdateEmployeeWeeklyScheduleDto) {
    return `This action updates a #${id} employeeWeeklySchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeeWeeklySchedule`;
  }
}
