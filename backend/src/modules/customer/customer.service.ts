import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}

  // Signup a new customer
  async signup(dto: CreateCustomerDto) {
    const exists = await this.customerRepo.findOne({
      where: [{ userName: dto.userName }, { email: dto.email }],
    });
    if (exists) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const customer = this.customerRepo.create({ ...dto, password: hashedPassword });
    return this.customerRepo.save(customer);
  }

  // Login a customer
  async login(userName: string, password: string) {
    const customer = await this.customerRepo.findOne({ where: { userName } });
    if (!customer || !(await bcrypt.compare(password, customer.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { message: 'Login successful', customerId: customer.id };
  }

  // Get all customers
  async findAll(): Promise<Customer[]> {
    return this.customerRepo.find();
  }

  // Get a customer by ID
  async findOne(id: number): Promise<Customer> {
    return this.findCustomerById(id);
  }

  // Update a customer
  async update(id: number, dto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findCustomerById(id);

    // If updating password, hash it
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    if (dto.userName || dto.email) {
      const conflict = await this.customerRepo.findOne({
        where: [
          { userName: dto.userName },
          { email: dto.email },
        ],
      });
      if (conflict && conflict.id !== id) {
        throw new ConflictException('Username or email already taken');
      }
    }

    Object.assign(customer, dto);
    return this.customerRepo.save(customer);
  }

  // Delete a customer
  async remove(id: number) {
    const customer = await this.findCustomerById(id);
    await this.customerRepo.delete(id);
    return { message: 'Customer deleted successfully' };
  }

  // Private helper to reduce repeated code
  private async findCustomerById(id: number): Promise<Customer> {
    const customer = await this.customerRepo.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }
}
