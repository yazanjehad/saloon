import { Controller, Post, Body, Get, Param, Patch, Delete, ParseIntPipe, UsePipes, ValidationPipe, Request, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';
import { CustomerAuthGuard } from 'src/auth/guards/customer.guard';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async signup(@Body() dto: CreateCustomerDto): Promise<CustomerResponseDto> {
    return this.customerService.signup(dto);
  }

  @Post('login')
  async login(@Body() body: { userName: string; password: string }) {
    return this.customerService.login(body.userName, body.password);
  }

  @UseGuards(CustomerAuthGuard)
  @Get('all')
  async findAll(): Promise<CustomerResponseDto[]> {
    return this.customerService.findAll();
  }

  @UseGuards(CustomerAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<CustomerResponseDto> {
    return this.customerService.findOne(id);
  }

  @UseGuards(CustomerAuthGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCustomerDto): Promise<CustomerResponseDto> {
    return this.customerService.update(id, dto);
  }

  @UseGuards(CustomerAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.remove(id);
  }

  @UseGuards(CustomerAuthGuard)
  @Get('me/profile')
  getMyProfile(@Request() req) {
    return this.customerService.findOne(req.user.id);
  }
}
