import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { EmployeeWeeklyScheduleService } from './employee-weekly-schedule.service';

@Controller('employee-weekly-schedule')
export class EmployeeWeeklyScheduleController {
  constructor(
    private readonly scheduleService: EmployeeWeeklyScheduleService,
  ) {}

  @Post()
  create(@Body() dto: any) {
    return this.scheduleService.create(dto);
  }

  @Get()
  findAll() {
    return this.scheduleService.findAll();
  }

  @Get('employee/:id')
  findByEmployee(@Param('id') id: number) {
    return this.scheduleService.findByEmployee(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.scheduleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: any) {
    return this.scheduleService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.scheduleService.remove(id);
  }
}
