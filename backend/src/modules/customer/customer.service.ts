import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, DeepPartial } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}

  private toResponse(Customer: Customer): CustomerResponseDto {
    return new CustomerResponseDto(Customer);
  }

  // Signup
  async signup(dto: CreateCustomerDto): Promise<CustomerResponseDto> {
    // check the basics (username/email/phone)
    const conflict = await this.customerRepo.findOne({
      where: [{ userName: dto.userName }, { email: dto.email }, { phone: dto.phone }],
    });
    if (conflict) {
      // return best possible message
      if (conflict.userName === dto.userName) throw new ConflictException('Username already exists.');
      if (conflict.email === dto.email) throw new ConflictException('Email already exists.');
      if (conflict.phone === dto.phone) throw new ConflictException('Phone already exists.');
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const customer = this.customerRepo.create({ ...dto, password: hashed } as DeepPartial<Customer>);
    const saved = await this.customerRepo.save(customer);
    return this.toResponse(saved as Customer);
  }

  // Login
  async login(userName: string, password: string) {
    const customer = await this.customerRepo.findOne({ where: { userName } });
    if (!customer) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(password, customer.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    // later: generate JWT here and return token + customer DTO
    return {
      message: 'Login successful',
      customer: this.toResponse(customer),
    };
  }

  // Find all
  async findAll(): Promise<CustomerResponseDto[]> {
    const all = await this.customerRepo.find();
    return all.map((Customer) => this.toResponse(Customer));
  }

  // Find one
  async findOne(id: number): Promise<CustomerResponseDto> {
    const c = await this.customerRepo.findOne({ where: { id } });
    if (!c) throw new NotFoundException('Customer not found');
    return this.toResponse(c);
  }

  // Update
  async update(id: number, dto: UpdateCustomerDto): Promise<CustomerResponseDto> {
    const customer = await this.customerRepo.findOne({ where: { id } });
    if (!customer) throw new NotFoundException('Customer not found');

    // check conflicts for username/email/phone excluding current id
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
    return this.toResponse(saved as Customer);
  }

  // Remove
  async remove(id: number): Promise<{ message: string }> {
    const customer = await this.customerRepo.findOne({ where: { id } });
    if (!customer) throw new NotFoundException('Customer not found');

    await this.customerRepo.delete(id);
    return { message: 'Customer deleted successfully' };
  }
}
