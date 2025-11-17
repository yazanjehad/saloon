import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // Signup method to register a new customer user
  @Post('signup')
  async signup(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.signup(createCustomerDto);
  }
  // Login method to authenticate a customer user
  @Post('login')
  async login(@Body() body: { userName: string; password: string }) {
    return this.customerService.login(body.userName, body.password);
  }

  // CRUD endpoints for customer users 
  // Get all customers
  @Get('all')
  findAll() {
    return this.customerService.findAll();
  }

  // Get a specific customer by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  // Update a customer's information
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  // Delete a customer by ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
