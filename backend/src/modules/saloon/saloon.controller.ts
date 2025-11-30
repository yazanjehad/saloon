import { Controller, UseGuards, Post, Patch, Delete, Get, Body, Param, ParseIntPipe } from '@nestjs/common';
import { SaloonService } from './saloon.service';
import { adminGuard } from 'src/auth/guards/admin.gurad';
import { CreateSaloonDto } from './dto/create-saloon.dto';
import { UpdateSaloonDto } from './dto/update-saloon.dto';
import { SaloonMessages } from 'src/common/error-messages';

@Controller('saloons')
export class SaloonController {
  constructor(private readonly saloonService: SaloonService) {}

  @Post('create')
  @UseGuards(adminGuard)
  async create(@Body() dto: CreateSaloonDto) {
    return { message: SaloonMessages.CREATED, data: await this.saloonService.create(dto) };
  }

  @Patch(':id')
  @UseGuards(adminGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSaloonDto) {
    return { message: SaloonMessages.UPDATED, data: await this.saloonService.update(id, dto) };
  }

  @Delete(':id')
  @UseGuards(adminGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return { message: SaloonMessages.DELETED, data: await this.saloonService.remove(id) };
  }

  @Get('all')
  @UseGuards(adminGuard)
  async findAll() {
    return { message: SaloonMessages.FETCHED, data: await this.saloonService.findAll() };
  }

  @Get(':id')
  @UseGuards(adminGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return { message: SaloonMessages.FETCHED, data: await this.saloonService.findOne(id) };
  }
}
