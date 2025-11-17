import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminSaloon } from './entities/admin.entity';

// Controller to handle admin-related HTTP requests
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  
  //signup method to register a new admin user
  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async signup(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.signup(createAdminDto);
  }

  // Login method to authenticate an admin user
  @Post('login')
  async login(@Body() body: { userName: string; password: string }) {
    return this.adminService.login(body.userName, body.password);
  }


  // CRUD endpoints for admin users
  // create a new admin user
  @Post('add')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createAdminDto: CreateAdminDto): Promise<AdminSaloon> {
    return this.adminService.create(createAdminDto);
  }

  //get all admin users
  @Get('all')
  async findAll(): Promise<AdminSaloon[]> {
    return this.adminService.findAll();
  }

  //get a specific admin user by id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<AdminSaloon> {
    return this.adminService.findOne(id);
  }

  //update an existing admin user
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<AdminSaloon> {
    return this.adminService.update(id, updateAdminDto);
  }

  //delete an admin user
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.remove(id);
  }
}
