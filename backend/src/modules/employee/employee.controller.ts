import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';

import { EmployeeService } from './employee.service';
import { adminGuard } from 'src/auth/guards/admin.gurad';
import { EmployeeGuard } from 'src/auth/guards/employee.guard';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeMessages } from 'src/common/error-messages';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  // 🔥 إضافة موظف — فقط للأدمن
@UseGuards(adminGuard)
@Post('create')
async createEmployee(@Body() body: CreateEmployeeDto) {
  await this.employeeService.createEmployee(body);
  return { message: EmployeeMessages.CREATED };
}

// Login
@Post('Login')
async loginEmployee(@Body() body: { userName: string; password: string }) {
  const result = await this.employeeService.loginEmployee(body.userName, body.password);
  return {
    message: EmployeeMessages.LOGIN_SUCCESS,
    data: result.data,
  };
}


  // 🔥 جلب كل الموظفين — فقط للأدمن
  @UseGuards(adminGuard)
  @Get('all')
  getAllEmployees() {
    return this.employeeService.findAllEmployees();
  }

  // 🔥 جلب موظف معين — فقط للأدمن
  @UseGuards(adminGuard)
  @Get(':id')
  getEmployeeById(@Param('id') id: string) {
    return this.employeeService.findEmployeeById(Number(id));
  }

  // 🔥 تعديل موظف — فقط للأدمن
@UseGuards(adminGuard)
@Patch(':id')
async updateEmployee(
  @Param('id') id: string,
  @Body() body: { userName?: string; password?: string },
) {
  await this.employeeService.updateEmployee(Number(id), body);
  return { message: EmployeeMessages.UPDATED };
}

  // 🔥 حذف موظف — فقط للأدمن
@UseGuards(adminGuard)
@Delete(':id')
async deleteEmployee(@Param('id') id: string) {
  await this.employeeService.deleteEmployee(Number(id));
  return { message: EmployeeMessages.DELETED };
}

  // ⭐ الموظف يشوف بياناته فقط
  @UseGuards(EmployeeGuard)
  @Get('me/profile')
  getMyProfile(@Request() req) {
    return this.employeeService.findEmployeeById(req.user.id);
  }
}