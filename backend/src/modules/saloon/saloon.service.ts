import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Saloon } from './entities/saloon.entity';
import { AdminSaloon } from '../admin/entities/admin.entity';
import { CreateSaloonDto } from './dto/create-saloon.dto';

@Injectable()
export class SaloonService {
  constructor(
    @InjectRepository(Saloon)
    private readonly saloonRepo: Repository<Saloon>,
    @InjectRepository(AdminSaloon)
    private readonly adminRepo: Repository<AdminSaloon>,
  ) {}

  async createSaloon(dto: CreateSaloonDto, adminId: number) {
    const admin = await this.adminRepo.findOne({ where: { id: adminId } });
    if (!admin) throw new NotFoundException('Admin not found');

    const saloon = this.saloonRepo.create({ ...dto, admin });
    return this.saloonRepo.save(saloon);
  }

  async findAll() {
    return this.saloonRepo.find({ relations: ['admin'] });
  }

  async findOne(id: number) {
    const saloon = await this.saloonRepo.findOne({ where: { id }, relations: ['admin'] });
    if (!saloon) throw new NotFoundException('Saloon not found');
    return saloon;
  }

  async update(id: number, dto: CreateSaloonDto) {
    const saloon = await this.findOne(id);
    Object.assign(saloon, dto);
    return this.saloonRepo.save(saloon);
  }

  async remove(id: number) {
    const saloon = await this.findOne(id);
    return this.saloonRepo.remove(saloon);
  }
}
