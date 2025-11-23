// src/modules/saloon/saloon.controller.ts
import { Controller, UseGuards, Post, Patch, Delete, Get, Body, Param, ParseIntPipe } from '@nestjs/common';
import { SaloonService } from './saloon.service';
import { adminGuard } from 'src/auth/guards/admin.gurad';
import { CreateSaloonDto } from './dto/create-saloon.dto';
import { UpdateSaloonDto } from './dto/update-saloon.dto';
import { SaloonMessages } from 'src/common/error-messages';

@Controller('saloons')
export class SaloonController {
  constructor(private readonly saloonService: SaloonService) {}

  // إنشاء صالون جديد (Admin فقط)
  @Post('create')
  @UseGuards(adminGuard)
  async create(@Body() dto: CreateSaloonDto) {
    const result = await this.saloonService.create(dto);
    return { message: SaloonMessages.CREATED, data: result };
  }

  // تعديل صالون (Admin فقط)
  @Patch(':id')
  @UseGuards(adminGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSaloonDto) {
    const result = await this.saloonService.update(id, dto);
    return { message: SaloonMessages.UPDATED, data: result };
  }

  // حذف صالون (Admin فقط)
  @Delete(':id')
  @UseGuards(adminGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.saloonService.remove(id);
    return { message: SaloonMessages.DELETED, data: result };
  }

  // جلب كل الصالونات (Admin فقط)
  @Get('all')
  @UseGuards(adminGuard)
  async findAll() {
    const result = await this.saloonService.findAll();
    return { message: SaloonMessages.FETCHED, data: result };
  }

  // جلب صالون واحد (Admin فقط)
  @Get(':id')
  @UseGuards(adminGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.saloonService.findOne(id);
    return { message: SaloonMessages.FETCHED, data: result };
  }
}
