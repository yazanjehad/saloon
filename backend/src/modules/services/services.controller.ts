import { Controller, UseGuards, Post, Patch, Delete, Get, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ServicesService } from './services.service';
import { adminGuard } from 'src/auth/guards/admin.gurad';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  // إنشاء خدمة جديدة (Admin فقط)
  @Post('create')
  @UseGuards(adminGuard)
  async create(@Body() dto: CreateServiceDto) {
    const result = await this.servicesService.create(dto);
    return { message: 'Service created successfully', data: result.data };
  }

  // تعديل خدمة (Admin فقط)
  @Patch(':id')
  @UseGuards(adminGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateServiceDto) {
    const result = await this.servicesService.update(id, dto);
    return { message: 'Service updated successfully', data: result.data };
  }

  // حذف خدمة (Admin فقط)
  @Delete(':id')
  @UseGuards(adminGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.servicesService.remove(id);
    return { message: 'Service removed successfully', data: result.data };
  }

  // جلب كل الخدمات (Admin فقط)
  @Get('all')
  @UseGuards(adminGuard)
  async findAll() {
    const result = await this.servicesService.findAll();
    return { message: 'Services fetched successfully', data: result.data };
  }

  // جلب خدمة واحدة (Admin فقط)
  @Get(':id')
  @UseGuards(adminGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.servicesService.findOne(id);
    return { message: 'Service fetched successfully', data: result.data };
  }
}
