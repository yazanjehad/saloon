import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminSaloon } from './entities/admin.entity';
import { AdminResponseDto } from './dto/admin-response.dto';

// Controller to handle admin-related HTTP requests
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // create a new admin user
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
  //get all admin users
  @Get('all')
async findAll(): Promise<AdminResponseDto[]> {
  const admins = await this.adminService.findAll();
  return admins.map(admin => new AdminResponseDto(admin)); 
}

  //get a specific admin user by id
  @Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number): Promise<AdminResponseDto> {
  const admin = await this.adminService.findOne(id); 
  return new AdminResponseDto(admin); 
}

  //update an existing admin user
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<{message: string}> {
    await this.adminService.update(id, updateAdminDto);
    return { message: 'Admin updated successfully' };
  }
  //delete an admin user
 @Delete(':id')
async remove(@Param('id', ParseIntPipe) id: number) {
  await this.adminService.remove(id);
  return { message: 'Admin deleted successfully' };
}

  
}
