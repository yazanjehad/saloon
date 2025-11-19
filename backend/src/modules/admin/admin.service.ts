import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AdminSaloon } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminSaloon)
    private readonly adminRepo: Repository<AdminSaloon>,
  ) {}

  async signup(dto: CreateAdminDto): Promise<AdminSaloon> {
    // check uniqueness
    const exists = await this.adminRepo.findOne({
      where: [
        { userName: dto.userName },
        { email: dto.email },
        { phone: dto.phone },
      ],
    });

    if (exists) {
      throw new ConflictException('User already exists');
    }

    // hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const admin = this.adminRepo.create({
      ...dto,
      password: hashedPassword,
    });

    return this.adminRepo.save(admin);
  }

  async login(userName: string, password: string) {
    const admin = await this.adminRepo.findOne({ where: { userName } });

    if (!admin) {
      throw new NotFoundException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      throw new NotFoundException('Invalid credentials');
    }

    return {
      message: 'Login successful',
      adminId: admin.id,
      // place to add JWT token when ready
    };
  }
  // CRUD Operations
  // find all admins
  findAll() {
    return this.adminRepo.find();
  }

  // find one admin by id
  async findOne(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) throw new NotFoundException('Admin not found');
    return admin;
  }

  // update admin
  async update(id: number, dto: UpdateAdminDto) {
    const admin = await this.findOne(id);

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    Object.assign(admin, dto);

    return this.adminRepo.save(admin);
  }

  // remove admin
  async remove(id: number) {
    const admin = await this.findOne(id);
    return this.adminRepo.remove(admin);
  }
}
