// import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
// import { ServicesService } from './services.service';
// import { CreateServiceDto } from './dto/create-service.dto';
// import { adminGuard } from 'src/auth/guards/admin.gurad';
// import { UpdateServiceDto } from './dto/update-service.dto';

// @Controller('services')
// export class ServicesController {
//   constructor(private readonly servicesService: ServicesService) {}

//   @Post('create')
// @UseGuards(adminGuard)
// async create(@Body() dto: CreateServiceDto) {
//   const result = await this.servicesService.create(dto);
//   return { message: 'Service created successfully', data: result };
// }

// @Get('all')
// async findAll() {
//   const result = await this.servicesService.findAll();
//   return { message: 'Services fetched successfully', data: result };
// }

// @Get(':id')
// async findOne(@Param('id', ParseIntPipe) id: number) {
//   const result = await this.servicesService.findOne(id);
//   return { message: 'Service fetched successfully', data: result };
// }

// @Patch(':id')
// @UseGuards(adminGuard)
// async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateServiceDto) {
//   const result = await this.servicesService.update(id, dto);
//   return { message: 'Service updated successfully', data: result };
// }

// @Delete(':id')
// @UseGuards(adminGuard)
// async remove(@Param('id', ParseIntPipe) id: number) {
//   const result = await this.servicesService.remove(id);
//   return { message: 'Service deleted successfully', data: result };
// }
// }
// src/modules/services/services.controller.ts
import { Controller, Post, Patch, Delete, Get, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AdminGuard } from 'src/auth/guards/services.gurad';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post('create')
  @UseGuards(AdminGuard)
  async create(@Body() dto: CreateServiceDto) {
    return this.servicesService.create(dto);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateServiceDto) {
    return this.servicesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.servicesService.remove(id);
  }

  @Get('all')
  async findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.servicesService.findOne(id);
  }
}
