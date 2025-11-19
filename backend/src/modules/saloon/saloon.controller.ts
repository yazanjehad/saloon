import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { SaloonService } from './saloon.service';
import { CreateSaloonDto } from './dto/create-saloon.dto';
import { SaloonResponseDto } from './dto/saloon-response.dto';

@Controller('saloon')
export class SaloonController {
  constructor(private readonly saloonService: SaloonService) {}

  // Admin adds a new saloon (JWT-protected)
  // @Post('create')
  // @UseGuards(JwtAuthGuard) 
  // @UsePipes(new ValidationPipe({ whitelist: true }))
  // async create(@Body() dto: CreateSaloonDto, @Req() req): Promise<SaloonResponseDto> {
  //   const adminId = req.user.id; 
  //   const saloon = await this.saloonService.createSaloon(dto, adminId);
  //   return new SaloonResponseDto(saloon);
  // }


  // Get all saloons
  @Get('all')
  async findAll(): Promise<SaloonResponseDto[]> {
    const saloons = await this.saloonService.findAll();
    return saloons.map(s => new SaloonResponseDto(s));
  }

  // Get a specific saloon
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<SaloonResponseDto> {
    const saloon = await this.saloonService.findOne(id);
    return new SaloonResponseDto(saloon);
  }

  // Update a saloon
@Patch(':id')
@UsePipes(new ValidationPipe({ whitelist: true }))
async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateSaloonDto) {
  await this.saloonService.update(id, dto);
  return { message: 'Saloon updated successfully' };
}
// Delete a saloon
@Delete(':id')
async remove(@Param('id', ParseIntPipe) id: number) {
  await this.saloonService.remove(id);
  return { message: 'Saloon deleted successfully' };
}

}
