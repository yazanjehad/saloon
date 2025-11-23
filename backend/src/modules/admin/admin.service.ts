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
}

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminSaloon)
    private readonly adminRepo: Repository<AdminSaloon>,
    private readonly jwtService: JwtService,
  ) {}

  // ================================
  // SIGNUP — إنشاء أدمن جديد
  // ================================
  async signup(dto: CreateAdminDto) {
    // تحقق من عدم التكرار
    const exists = await this.adminRepo.findOne({
      where: [{ userName: dto.userName }, { email: dto.email }],
    });
    if (exists) throw new ConflictException('Username or email already in use');

    const hashed = await bcrypt.hash(dto.password, 10);

    const admin = this.adminRepo.create({
      ...dto,
      password: hashed,
    });

    const saved = await this.adminRepo.save(admin);

    return {
      message: 'Admin created successfully',
      data: {
        id: saved.id,
        userName: saved.userName,
        email: saved.email,
      },
    };
  }

  // ================================
  // LOGIN — تسجيل دخول
  // ================================
  async login(userName: string, password: string) {
    const admin = await this.adminRepo.findOne({ where: { userName } });
    if (!admin) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload: AdminJwtPayload = {
      sub: admin.id,
      userName: admin.userName,
    };

    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ADMIN_SECRET,
    });

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
  // CRUD — العمليات الأساسية
  // ================================
  async findAll(): Promise<AdminSaloon[]> {
    return this.adminRepo.find();
  }

  async findOne(id: number): Promise<AdminSaloon> {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) throw new NotFoundException('Admin not found');
    return admin;
  }

  async update(id: number, dto: UpdateAdminDto) {
    const admin = await this.findOne(id);

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    Object.assign(admin, dto);
    const updatedAdmin = await this.adminRepo.save(admin);

    return {
      message: 'Admin updated successfully',
      data: updatedAdmin,
    };
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    await this.adminRepo.remove(admin);

    return {
      message: 'Admin removed successfully',
      data: admin,
    };
  }
}
