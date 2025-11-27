import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { adminGuard } from 'src/auth/guards/admin.gurad';
import { EmployeeGuard } from 'src/auth/guards/employee.guard';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeMessages } from 'src/common/error-messages';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @UseGuards(adminGuard)
  @Post('create')
  async createEmployee(@Body() dto: CreateEmployeeDto) {
    const result = await this.employeeService.createEmployee(dto);
    return { message: EmployeeMessages.CREATED, data: result.data };
  }

  @Post('login')
  async loginEmployee(@Body() body: { userName: string; password: string }) {
    const result = await this.employeeService.loginEmployee(body.userName, body.password);
    return { message: EmployeeMessages.LOGIN_SUCCESS, data: result.data };
  }

  @UseGuards(adminGuard)
  @Get('all')
  getAllEmployees() {
    return this.employeeService.findAllEmployees();
  }

  @UseGuards(adminGuard)
  @Get(':id')
  getEmployeeById(@Param('id') id: string) {
    return this.employeeService.findEmployeeById(Number(id));
  }

  @UseGuards(adminGuard)
  @Patch(':id')
  async updateEmployee(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
    const result = await this.employeeService.updateEmployee(Number(id), dto);
    return { message: EmployeeMessages.UPDATED, data: result.data };
  }

  @UseGuards(adminGuard)
  @Delete(':id')
  async deleteEmployee(@Param('id') id: string) {
    const result = await this.employeeService.deleteEmployee(Number(id));
    return { message: EmployeeMessages.DELETED, data: result.data };
  }

  @UseGuards(EmployeeGuard)
  @Get('me/profile')
  getMyProfile(@Request() req) {
    return this.employeeService.findEmployeeById(req.user.id);
  }
}
