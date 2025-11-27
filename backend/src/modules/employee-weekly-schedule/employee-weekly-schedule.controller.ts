import { Controller, Post, Patch, Delete, Get, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { EmployeeWeeklyScheduleService } from './employee-weekly-schedule.service';
import { CreateEmployeeWeeklyScheduleDto } from './dto/create-employee-weekly-schedule.dto';
import { EmployeeWeeklyScheduleMessages } from 'src/common/error-messages';
import { adminGuard } from 'src/auth/guards/admin.gurad';

@Controller('employee-weekly-schedule')
export class EmployeeWeeklyScheduleController {
  constructor(private readonly scheduleService: EmployeeWeeklyScheduleService) {}

  // 🔹 إنشاء جدول أسبوعي لموظف — فقط للأدمن
  @Post('create')
  @UseGuards(adminGuard)
  async create(@Body() dto: CreateEmployeeWeeklyScheduleDto) {
    const result = await this.scheduleService.create(dto);
    return { message: EmployeeWeeklyScheduleMessages.CREATED, data: result };
  }

  // 🔹 جلب كل الجداول الأسبوعية — فقط للأدمن
  @Get('all')
  @UseGuards(adminGuard)
  async findAll() {
    const result = await this.scheduleService.findAll();
    return { message: EmployeeWeeklyScheduleMessages.FETCHED, data: result };
  }

  // 🔹 جلب جدول أسبوعي لموظف معين — فقط للأدمن
  @Get('employee/:id')
  @UseGuards(adminGuard)
  async findByEmployee(@Param('id', ParseIntPipe) id: number) {
    const result = await this.scheduleService.findByEmployee(id);
    return { message: EmployeeWeeklyScheduleMessages.FETCHED, data: result };
  }

  // 🔹 جلب جدول محدد بالـID — فقط للأدمن
  @Get(':id')
  @UseGuards(adminGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.scheduleService.findOne(id);
    return { message: EmployeeWeeklyScheduleMessages.FETCHED, data: result };
  }

  // 🔹 تحديث جدول أسبوعي — فقط للأدمن
  @Patch(':id')
  @UseGuards(adminGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<CreateEmployeeWeeklyScheduleDto>) {
    const result = await this.scheduleService.update(id, dto);
    return { message: EmployeeWeeklyScheduleMessages.UPDATED, data: result };
  }

  // 🔹 حذف جدول أسبوعي — فقط للأدمن
  @Delete(':id')
  @UseGuards(adminGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.scheduleService.delete(id);
    return { message: EmployeeWeeklyScheduleMessages.DELETED, data: result };
  }
}
