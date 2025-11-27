import { Controller, Post, Patch, Delete, Get, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { EmployeeWeeklyScheduleService } from './employee-weekly-schedule.service';
import { CreateEmployeeWeeklyScheduleDto } from './dto/create-employee-weekly-schedule.dto';
import { adminGuard } from 'src/auth/guards/admin.gurad';

@Controller('employee-weekly-schedule')
export class EmployeeWeeklyScheduleController {
  constructor(private readonly scheduleService: EmployeeWeeklyScheduleService) {}

  @Post('create')
  @UseGuards(adminGuard)
  async create(@Body() dto: CreateEmployeeWeeklyScheduleDto) {
    const data = await this.scheduleService.create(dto);
    return { message: 'Schedule created successfully', data };
  }

  @Get('all')
  @UseGuards(adminGuard)
  async findAll() {
    const data = await this.scheduleService.findAll();
    return { message: 'Schedules fetched successfully', data };
  }

  @Get('employee/:id')
  @UseGuards(adminGuard)
  async findByEmployee(@Param('id', ParseIntPipe) id: number) {
    const data = await this.scheduleService.findByEmployee(id);
    return { message: 'Schedules fetched successfully', data };
  }

  @Get(':id')
  @UseGuards(adminGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.scheduleService.findOne(id);
    return { message: 'Schedule fetched successfully', data };
  }

  @Patch(':id')
  @UseGuards(adminGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<CreateEmployeeWeeklyScheduleDto>) {
    const data = await this.scheduleService.update(id, dto);
    return { message: 'Schedule updated successfully', data };
  }

  @Delete(':id')
  @UseGuards(adminGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.scheduleService.delete(id);
    return { message: 'Schedule deleted successfully', data };
  }
}
