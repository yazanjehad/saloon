// src/modules/saloon/saloon.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Saloon } from './entities/saloon.entity';
import { AdminSaloon } from '../admin/entities/admin.entity';
import { CreateSaloonDto } from './dto/create-saloon.dto';
import { SaloonResponseDto } from './dto/saloon-response.dto';
import { UpdateSaloonDto } from './dto/update-saloon.dto';

@Injectable()
export class SaloonService {
  constructor(
    @InjectRepository(Saloon)
    private readonly saloonRepo: Repository<Saloon>,
    @InjectRepository(AdminSaloon)
    private readonly adminRepo: Repository<AdminSaloon>,
  ) {}

  private toResponse(saloon: Saloon): SaloonResponseDto {
    return new SaloonResponseDto(saloon);
  }

  async create(dto: CreateSaloonDto): Promise<SaloonResponseDto> {
    const admin = await this.adminRepo.findOne({ where: { id: dto.adminId } });
    if (!admin) throw new NotFoundException('Admin not found');

    const { adminId, ...saloonData } = dto;

    const saloon = this.saloonRepo.create({ ...saloonData, admin });
    const saved = await this.saloonRepo.save(saloon);

    const fullSaloon = await this.saloonRepo.findOne({
      where: { id: saved.id },
      relations: ['admin', 'employees'], // <-- إضافة الموظفين هنا
    });

    if (!fullSaloon)
      throw new NotFoundException('Saloon not found after saving');

    return this.toResponse(fullSaloon);
  }

  async update(id: number, dto: UpdateSaloonDto): Promise<SaloonResponseDto> {
    const saloon = await this.saloonRepo.findOne({
      where: { id },
      relations: ['admin', 'employees'], // <-- إضافة الموظفين هنا
    });
    if (!saloon) throw new NotFoundException('Saloon not found');

    if (dto.adminId && dto.adminId !== saloon.admin.id) {
      const newAdmin = await this.adminRepo.findOne({
        where: { id: dto.adminId },
      });
      if (!newAdmin) throw new NotFoundException('Admin not found');
      saloon.admin = newAdmin;
    }

    const { adminId, ...saloonData } = dto;
    Object.assign(saloon, saloonData);

    const saved = await this.saloonRepo.save(saloon);
    return this.toResponse(saved);
  }

  async findAll(): Promise<SaloonResponseDto[]> {
    const all = await this.saloonRepo.find({
      relations: ['admin', 'employees'],
    }); // <-- إضافة الموظفين هنا
    return all.map((s) => this.toResponse(s));
  }

  async findOne(id: number): Promise<SaloonResponseDto> {
    const saloon = await this.saloonRepo.findOne({
      where: { id },
      relations: ['admin', 'employees'], // <-- إضافة الموظفين هنا
    });
    if (!saloon) throw new NotFoundException('Saloon not found');
    return this.toResponse(saloon);
  }

  async remove(id: number): Promise<{ message: string }> {
    const saloon = await this.saloonRepo.findOne({ where: { id } });
    if (!saloon) throw new NotFoundException('Saloon not found');

    await this.saloonRepo.remove(saloon);
    return { message: 'Saloon deleted successfully' };
  }
}
