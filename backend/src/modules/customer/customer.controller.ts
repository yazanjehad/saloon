import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { promises } from 'dns';
import { CustomerResponseDto } from './dto/customer-response.dto';


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
  async findAll(): Promise<CustomerResponseDto[]> {
    const customers = await this.customerService.findAll();
    return customers.map(customer => new CustomerResponseDto(customer));
  } 

  // Get a specific customer by ID
    @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<CustomerResponseDto> {
    const customer = await this.customerService.findOne(id);
    return new CustomerResponseDto(customer);
  }
  // Update a customer's information
  @Patch(':id')
async update(
  @Param('id') id: string, 
  @Body() updateCustomerDto: UpdateCustomerDto
): Promise<{ message: string }> {
  await this.customerService.update(+id, updateCustomerDto); 
  return { message: 'Customer updated successfully' };  
}

  // Delete a customer by ID
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
  await this.customerService.remove(id);
  return { message: 'Customer deleted successfully' };  }
}
