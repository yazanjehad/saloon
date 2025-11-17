// src/modules/admin-saloon/admin.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AdminSaloon } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

// Service to manage admin users for the saloon application
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminSaloon)
    private readonly adminRepo: Repository<AdminSaloon>,
  ) {}

  // Method to handle admin signup
  async signup(dto: CreateAdminDto) {
    const exists = await this.adminRepo.findOne({
      where: { userName: dto.userName },
    });

    if (exists) {
      throw new ConflictException('User already exists');
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    const admin = this.adminRepo.create({
      ...dto,
      password: hashed,
    });

    return this.adminRepo.save(admin);
  }

  // Method to handle admin login
  async login(userName: string, password: string) {
    const admin = await this.adminRepo.findOne({ where: { userName } });

    if (!admin) {
      throw new NotFoundException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      throw new NotFoundException('Invalid credentials');
    }

    return { message: 'Login successful', adminId: admin.id };
  }

  // CRUD operations for admin users
  // Create a new admin user
  async create(dto: CreateAdminDto): Promise<AdminSaloon> {
    return this.signup(dto); 
  }

  // Get all admin users
  async findAll(): Promise<AdminSaloon[]> {
    return this.adminRepo.find();
  }

  // Get a specific admin user by ID
  async findOne(id: number): Promise<AdminSaloon> {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) throw new NotFoundException();
    return admin;
  }

  // Update an existing admin user
  async update(id: number, dto: UpdateAdminDto): Promise<AdminSaloon> {
    await this.adminRepo.update(id, dto);
    return this.findOne(id);
  }

  // Delete an admin user
  async remove(id: number) {
    return this.adminRepo.delete(id);
  }
}
