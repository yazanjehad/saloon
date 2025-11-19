import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';

import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminSaloon } from './entities/admin.entity';

import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // ================================
  //       Admin Signup
  // ================================
  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async signup(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.signup(createAdminDto);
  }

  // ================================
  //       Admin Login
  // ================================
  @Post('login')
  async login(@Body() body: { userName: string; password: string }) {
    return this.adminService.login(body.userName, body.password);
  }

  // ================================
  //       Protected Routes
  // ================================

  @Get('all')
  @UseGuards(AdminGuard)
  async findAll(): Promise<AdminSaloon[]> {
    return this.adminService.findAll();
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<AdminSaloon> {
    return this.adminService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<AdminSaloon> {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.remove(id);
  }
}
