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
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminResponseDto } from './dto/admin-response.dto';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Create a new admin
  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async signup(@Body() dto: CreateAdminDto) {
    const admin = await this.adminService.signup(dto);
    return new AdminResponseDto(admin);
  }

  // Admin login
  @Post('login')
  async login(@Body() body: { userName: string; password: string }) {
    return this.adminService.login(body.userName, body.password);
  }

  // Get all admins
  @Get('all')
  async findAll(): Promise<AdminResponseDto[]> {
    const admins = await this.adminService.findAll();
    return admins.map((admin) => new AdminResponseDto(admin));
  }

  // Get a specific admin by ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new AdminResponseDto(await this.adminService.findOne(id));
  }

  // Update an admin by ID
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAdminDto,
  ) {
    await this.adminService.update(id, dto);
    return { message: 'Admin updated successfully' };
  }

  //  Delete an admin by ID
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.adminService.remove(id);
    return { message: 'Admin deleted successfully' };
  }
}
