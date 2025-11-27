import { 
  Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UsePipes, ValidationPipe, UseGuards, Req 
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminResponseDto } from './dto/admin-response.dto';
import { adminGuard } from '../../auth/guards/admin.gurad';
import { AdminMessages } from 'src/common/error-messages';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // -------------------- Public Routes --------------------
  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async signup(@Body() dto: CreateAdminDto) {
    return this.adminService.signup(dto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async login(@Body() body: { userName: string; password: string }) {
    return this.adminService.login(body.userName, body.password);
  }

  // -------------------- Protected Routes --------------------
  @UseGuards(adminGuard)
  @Get('profile')
  async getAdminProfile(@Req() req) {
    const admin = await this.adminService.findOne(req.user.id);
    return {
      message: AdminMessages.FETCHED,
      data: new AdminResponseDto(admin),
    };
  }

  @UseGuards(adminGuard)
  @Get('all')
  async findAll() {
    const admins = await this.adminService.findAll();
    return {
      message: AdminMessages.FETCHED,
      data: admins.map(admin => new AdminResponseDto(admin)),
    };
  }

  @UseGuards(adminGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const admin = await this.adminService.findOne(id);
    return {
      message: AdminMessages.FETCHED,
      data: new AdminResponseDto(admin),
    };
  }

  @UseGuards(adminGuard)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAdminDto) {
    const result = await this.adminService.update(id, dto);
    return {
      message: result.message,
      data: new AdminResponseDto(result.data),
    };
  }

  @UseGuards(adminGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.adminService.remove(id);
    return {
      message: result.message,
      data: new AdminResponseDto(result.data),
    };
  }
}
