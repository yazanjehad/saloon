import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { AdminSaloon } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminMessages } from 'src/common/error-messages';

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

  // -------------------- SIGNUP --------------------
  async signup(dto: CreateAdminDto) {
    const exists = await this.adminRepo.findOne({
      where: [{ userName: dto.userName }, { email: dto.email }, { phone: dto.phone }],
    });

    if (exists) {
      if (exists.userName === dto.userName)
        throw new ConflictException(AdminMessages.DUPLICATE_USERNAME);
      if (exists.email === dto.email)
        throw new ConflictException(AdminMessages.DUPLICATE_EMAIL);
      if (exists.phone === dto.phone)
        throw new ConflictException(AdminMessages.DUPLICATE_PHONE);
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const admin = this.adminRepo.create({ ...dto, password: hashed });

    try {
      const saved = await this.adminRepo.save(admin);
      return {
        message: AdminMessages.CREATED,
        data: {
          id: saved.id,
          userName: saved.userName,
          email: saved.email,
          phone: saved.phone,
        },
      };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(
          'Username, email, or phone already in use',
        );
      }
      throw error;
    }
  }

  // -------------------- LOGIN --------------------
  async login(userName: string, password: string) {
    const admin = await this.adminRepo.findOne({ where: { userName } });
    if (!admin) throw new UnauthorizedException(AdminMessages.LOGIN_FAILED);

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new UnauthorizedException(AdminMessages.LOGIN_FAILED);

    const payload: AdminJwtPayload = { sub: admin.id, userName: admin.userName };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ADMIN_SECRET,
    });

    return {
      message: AdminMessages.LOGIN_SUCCESS,
      access_token: token,
      admin: { id: admin.id, userName: admin.userName },
    };
  }

  // -------------------- CRUD --------------------
  async findAll(): Promise<AdminSaloon[]> {
    return this.adminRepo.find({ relations: ['saloons'] });
  }

  async findOne(id: number): Promise<AdminSaloon> {
    const admin = await this.adminRepo.findOne({ where: { id }, relations: ['saloons'] });
    if (!admin) throw new NotFoundException(AdminMessages.NOT_FOUND);
    return admin;
  }

  async update(id: number, dto: UpdateAdminDto) {
    const admin = await this.findOne(id);

    if (dto.password) dto.password = await bcrypt.hash(dto.password, 10);

    Object.assign(admin, dto);
    const updatedAdmin = await this.adminRepo.save(admin);

    return { message: AdminMessages.UPDATED, data: updatedAdmin };
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    await this.adminRepo.remove(admin);

    return { message: AdminMessages.DELETED, data: admin };
  }
}
