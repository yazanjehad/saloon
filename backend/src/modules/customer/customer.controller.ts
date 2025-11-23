import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // Signup a new customer
  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async signup(@Body() dto: CreateCustomerDto): Promise<CustomerResponseDto> {
    return this.customerService.signup(dto);
  }

  //  Login an existing customer
  @Post('login')
  async login(@Body() body: { userName: string; password: string }) {
    return this.customerService.login(body.userName, body.password);
  }

  //  Get all customers
  @Get()
  async findAll(): Promise<CustomerResponseDto[]> {
    return this.customerService.findAll();
  }

  //  Get a customer by ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<CustomerResponseDto> {
    return this.customerService.findOne(id);
  }

  //  Update a customer by ID
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCustomerDto,
  ): Promise<CustomerResponseDto> {
    return this.customerService.update(id, dto);
  }

//  Delete a customer by ID
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.remove(id);
  }
}
