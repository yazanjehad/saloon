// src/modules/saloon/saloon.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Saloon } from './entities/saloon.entity';
import { AdminSaloon } from '../admin/entities/admin.entity';
import { CreateSaloonDto } from './dto/create-saloon.dto';
import { SaloonResponseDto } from './dto/saloon-response.dto';


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

  async create(dto: CreateSaloonDto, adminId: number): Promise<SaloonResponseDto> {
    const admin = await this.adminRepo.findOne({ where: { id: adminId } });
    if (!admin) throw new NotFoundException('Admin not found');

    const saloon = this.saloonRepo.create({ ...dto, admin });
    const saved = await this.saloonRepo.save(saloon);
    return this.toResponse(saved);
  }

  async findAll(): Promise<SaloonResponseDto[]> {
    const all = await this.saloonRepo.find({ relations: ['admin'] });
    return all.map(s => this.toResponse(s));
  }

  async findOne(id: number): Promise<SaloonResponseDto> {
    const saloon = await this.saloonRepo.findOne({ where: { id }, relations: ['admin'] });
    if (!saloon) throw new NotFoundException('Saloon not found');
    return this.toResponse(saloon);
  }

  async update(id: number, dto: CreateSaloonDto): Promise<SaloonResponseDto> {
    const saloon = await this.saloonRepo.findOne({ where: { id } });
    if (!saloon) throw new NotFoundException('Saloon not found');

    Object.assign(saloon, dto);
    const saved = await this.saloonRepo.save(saloon);
    return this.toResponse(saved);
  }

  async remove(id: number): Promise<{ message: string }> {
    const saloon = await this.saloonRepo.findOne({ where: { id } });
    if (!saloon) throw new NotFoundException('Saloon not found');

    await this.saloonRepo.remove(saloon);
    return { message: 'Saloon deleted successfully' };
  }
}
