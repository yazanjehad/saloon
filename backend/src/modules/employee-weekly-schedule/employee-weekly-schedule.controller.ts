import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeWeeklyScheduleService } from './employee-weekly-schedule.service';
import { CreateEmployeeWeeklyScheduleDto } from './dto/create-employee-weekly-schedule.dto';
import { UpdateEmployeeWeeklyScheduleDto } from './dto/update-employee-weekly-schedule.dto';

@Controller('employee-weekly-schedule')
export class EmployeeWeeklyScheduleController {
  constructor(private readonly employeeWeeklyScheduleService: EmployeeWeeklyScheduleService) {}

  @Post()
  create(@Body() createEmployeeWeeklyScheduleDto: CreateEmployeeWeeklyScheduleDto) {
    return this.employeeWeeklyScheduleService.create(createEmployeeWeeklyScheduleDto);
  }

  @Get()
  findAll() {
    return this.employeeWeeklyScheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeWeeklyScheduleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeWeeklyScheduleDto: UpdateEmployeeWeeklyScheduleDto) {
    return this.employeeWeeklyScheduleService.update(+id, updateEmployeeWeeklyScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeWeeklyScheduleService.remove(+id);
  }
}
