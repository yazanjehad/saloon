// src/modules/admin/admin.service.ts

import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { AdminSaloon } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

interface AdminJwtPayload {
  sub: number;
  userName: string;
  role: string;
}

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminSaloon)
    private readonly adminRepo: Repository<AdminSaloon>,
    private readonly jwtService: JwtService,
  ) {}

  // ================================
  // SIGNUP — إنشاء حساب أدمن جديد
  // ================================
  async signup(dto: CreateAdminDto) {
    const exists = await this.adminRepo.findOne({
      where: { userName: dto.userName },
    });
    if (exists) throw new ConflictException('User already exists');

    const hashed = await bcrypt.hash(dto.password, 10);

    const admin = this.adminRepo.create({
      ...dto,
      password: hashed,
    });

    const saved = await this.adminRepo.save(admin);

    return {
      id: saved.id,
      userName: saved.userName,
    };
  }

  // ================================
  // LOGIN — إرجاع JWT Token للأدمن
  // ================================
  async login(userName: string, password: string) {
    // البحث عن الأدمن
    const admin = await this.adminRepo.findOne({ where: { userName } });
    if (!admin) throw new UnauthorizedException('Invalid credentials');

    // التحقق من كلمة المرور
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    // إعداد الـ payload
    const payload: AdminJwtPayload = {
      sub: admin.id,
      userName: admin.userName,
      role: 'admin',
    };

    // إنشاء الـ JWT token
    const token = this.jwtService.sign(payload);

    // إرجاع النتيجة
    return {
      message: 'Login successful',
      access_token: token,
      admin: {
        id: admin.id,
        userName: admin.userName,
      },
    };
  }

  // ================================
  // CRUD — العمليات العادية للأدمن
  // ================================
  async findAll(): Promise<AdminSaloon[]> {
    return this.adminRepo.find();
  }

  async findOne(id: number): Promise<AdminSaloon> {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) throw new NotFoundException('Admin not found');
    return admin;
  }

  async update(id: number, dto: UpdateAdminDto): Promise<AdminSaloon> {
    const admin = await this.findOne(id);
    Object.assign(admin, dto);
    return this.adminRepo.save(admin);
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    return this.adminRepo.remove(admin);
  }
}
