import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    private readonly jwtService: JwtService,
  ) {}

  private toResponse(customer: Customer): CustomerResponseDto {
    return new CustomerResponseDto(customer);
  }

  // Signup
  async signup(dto: CreateCustomerDto): Promise<CustomerResponseDto> {
    const conflict = await this.customerRepo.findOne({
      where: [{ userName: dto.userName }, { email: dto.email }, { phone: dto.phone }],
    });

    if (conflict) {
      if (conflict.userName === dto.userName) throw new ConflictException('Username already exists.');
      if (conflict.email === dto.email) throw new ConflictException('Email already exists.');
      if (conflict.phone === dto.phone) throw new ConflictException('Phone already exists.');
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const customer = this.customerRepo.create({ ...dto, password: hashed } as DeepPartial<Customer>);
    const saved = await this.customerRepo.save(customer);
    return this.toResponse(saved);
  }

  // Login
  async login(userName: string, password: string) {
    const customer = await this.customerRepo.findOne({ where: { userName } });
    if (!customer) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(password, customer.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    const payload = { id: customer.id };
    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successful',
      token,
      customer: this.toResponse(customer),
    };
  }

  // Get all customers
  async findAll(): Promise<CustomerResponseDto[]> {
    const all = await this.customerRepo.find();
    return all.map(customer => this.toResponse(customer));
  }

  // Get one customer
  async findOne(id: number): Promise<CustomerResponseDto> {
    const customer = await this.customerRepo.findOne({ where: { id } });
    if (!customer) throw new NotFoundException('Customer not found');
    return this.toResponse(customer);
  }

  // Update customer
  async update(id: number, dto: UpdateCustomerDto): Promise<CustomerResponseDto> {
    const customer = await this.customerRepo.findOne({ where: { id } });
    if (!customer) throw new NotFoundException('Customer not found');

    // Check conflicts
    if (dto.userName || dto.email || dto.phone) {
      const conflicts = await this.customerRepo.findOne({
        where: [
          dto.userName ? { userName: dto.userName } : null,
          dto.email ? { email: dto.email } : null,
          dto.phone ? { phone: dto.phone } : null,
        ].filter(Boolean) as any,
      });

      if (conflicts && conflicts.id !== id) {
        if (conflicts.userName === dto.userName) throw new ConflictException('Username already exists.');
        if (conflicts.email === dto.email) throw new ConflictException('Email already exists.');
        if (conflicts.phone === dto.phone) throw new ConflictException('Phone already exists.');
      }
    }

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    Object.assign(customer, dto);
    const saved = await this.customerRepo.save(customer);
    return this.toResponse(saved);
  }

  // Delete customer
  async remove(id: number): Promise<{ message: string }> {
    const customer = await this.customerRepo.findOne({ where: { id } });
    if (!customer) throw new NotFoundException('Customer not found');

    await this.customerRepo.delete(id);
    return { message: 'Customer deleted successfully' };
  }
}
