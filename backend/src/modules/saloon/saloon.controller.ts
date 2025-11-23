// src/modules/saloon/saloon.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { SaloonService } from './saloon.service';
import { CreateSaloonDto } from './dto/create-saloon.dto';
import { SaloonResponseDto } from './dto/saloon-response.dto';

@Controller('saloons')
export class SaloonController {
  constructor(private readonly saloonService: SaloonService) {}

  // Create a new saloon
  @Post('create')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() dto: CreateSaloonDto, adminId: number): Promise<SaloonResponseDto> {
    return this.saloonService.create(dto, adminId);
  }

  //  Get all saloons
  @Get('all')
  async findAll(): Promise<SaloonResponseDto[]> {
    return this.saloonService.findAll();
  }

  // Get a specific saloon by ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<SaloonResponseDto> {
    return this.saloonService.findOne(id);
  }

  // Update a specific saloon by ID
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateSaloonDto): Promise<SaloonResponseDto> {
    return this.saloonService.update(id, dto);
  }

  // Delete a specific saloon by ID
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.saloonService.remove(id);
  }
}
