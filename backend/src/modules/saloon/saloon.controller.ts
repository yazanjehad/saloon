import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaloonService } from './saloon.service';
import { CreateSaloonDto } from './dto/create-saloon.dto';
import { UpdateSaloonDto } from './dto/update-saloon.dto';

@Controller('saloon')
export class SaloonController {
  constructor(private readonly saloonService: SaloonService) {}

  @Post()
  create(@Body() createSaloonDto: CreateSaloonDto) {
    return this.saloonService.create(createSaloonDto);
  }

  @Get()
  findAll() {
    return this.saloonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saloonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaloonDto: UpdateSaloonDto) {
    return this.saloonService.update(+id, updateSaloonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saloonService.remove(+id);
  }
}
