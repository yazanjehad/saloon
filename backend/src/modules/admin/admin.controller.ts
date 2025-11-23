import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UsePipes, ValidationPipe, UseGuards, Req } from '@nestjs/common';

import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminResponseDto } from './dto/admin-response.dto';

// Import Admin Guard
import { adminGuard } from '../../auth/guards/admin.gurad';
// External modules controlled by admin
import { EmployeeService } from '../employee/employee.service';
import { SaloonService } from '../saloon/saloon.service';
import { CustomerService } from '../customer/customer.service';

// DTOs
import { CreateEmployeeDto } from '../employee/dto/create-employee.dto';
import { UpdateEmployeeDto } from '../employee/dto/update-employee.dto';
import { CreateSaloonDto } from '../saloon/dto/create-saloon.dto';
import { UpdateSaloonDto } from '../saloon/dto/update-saloon.dto';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { UpdateCustomerDto } from '../customer/dto/update-customer.dto';

import { AdminMessages } from '../../common/error-messages';

@Controller('admins')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly employeeService: EmployeeService,
    private readonly saloonService: SaloonService,
    private readonly customerService: CustomerService,
  ) {}

  // -----------------------------------------------------
  // Public Routes (no guard)
  // -----------------------------------------------------

  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  signup(@Body() dto: CreateAdminDto) {
    return this.adminService.signup(dto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  login(@Body() body: { userName: string; password: string }) {
    return this.adminService.login(body.userName, body.password);
  }

  // -----------------------------------------------------
  // Protected Routes (Admin Only)
  // -----------------------------------------------------
  @UseGuards(adminGuard)
  @Get('profile')
  getAdminProfile() {
    return { message: 'Admin route verified' };
  }

  // --- Admin basic CRUD ---
  @UseGuards(adminGuard)
  @Get('all')
  async findAll() {
    return (await this.adminService.findAll()).map(
      (admin) => new AdminResponseDto(admin),
    );
  }

  @UseGuards(adminGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new AdminResponseDto(await this.adminService.findOne(id));
  }

  @UseGuards(adminGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateAdminDto) {
    await this.adminService.update(id, dto);
    return { message: AdminMessages.UPDATED };
  }

  @UseGuards(adminGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.adminService.remove(id);
  return { message: AdminMessages.DELETED };
  }

  // -----------------------------------------------------
  // EMPLOYEE MANAGEMENT
  // -----------------------------------------------------

  @UseGuards(adminGuard)
  @Post('employees')
  createEmployee(@Body() dto: CreateEmployeeDto) {
    return this.employeeService.createEmployee(dto);
  }

  @UseGuards(adminGuard)
  @Get('employees')
  getEmployees() {
    return this.employeeService.findAllEmployees();
  }

  @UseGuards(adminGuard)
  @Get('employees/:id')
  getEmployee(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.findEmployeeById(id);
  }

  @UseGuards(adminGuard)
  @Patch('employees/:id')
  updateEmployee(@Param('id') id: number, @Body() dto: UpdateEmployeeDto) {
    return this.employeeService.updateEmployee(id, dto);
  }

  @UseGuards(adminGuard)
  @Delete('employees/:id')
  deleteEmployee(@Param('id') id: number) {
    return this.employeeService.deleteEmployee(id);
  }

  // -----------------------------------------------------
  // SALOON MANAGEMENT
  // -----------------------------------------------------

@UseGuards(adminGuard)
@Post('saloon')
createSaloon(@Body() dto: CreateSaloonDto) {
  return this.saloonService.create(dto);
}


  @UseGuards(adminGuard)
  @Get('saloons')
  getSaloons() {
    return this.saloonService.findAll();
  }

  @UseGuards(adminGuard)
  @Get('saloons/:id')
  getSaloon(@Param('id', ParseIntPipe) id: number) {
    return this.saloonService.findOne(id);
  }

  @UseGuards(adminGuard)
  @Patch('saloons/:id')
  updateSaloon(@Param('id') id: number, @Body() dto: UpdateSaloonDto) {
    return this.saloonService.update(id, dto);
  }

  @UseGuards(adminGuard)
  @Delete('saloons/:id')
  deleteSaloon(@Param('id') id: number) {
    return this.saloonService.remove(id);
  }

  // -----------------------------------------------------
  // CUSTOMER MANAGEMENT
  // -----------------------------------------------------


//   @UseGuards(adminGuard)
//   @Get('customers')
//   getCustomers() {
//     return this.customerService.findAll();
//   }

//   @UseGuards(adminGuard)
//   @Get('customers/:id')
//   getCustomer(@Param('id', ParseIntPipe) id: number) {
//     return this.customerService.findOne(id);
//   }

//   @UseGuards(adminGuard)
//   @Patch('customers/:id')
//   updateCustomer(@Param('id') id: number, @Body() dto: UpdateCustomerDto) {
//     return this.customerService.update(id, dto);
//   }

//   @UseGuards(adminGuard)
//   @Delete('customers/:id')
//   deleteCustomer(@Param('id') id: number) {
//     return this.customerService.remove(id);
//   }
// }
}