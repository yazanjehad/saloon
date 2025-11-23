import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
  ) {}

  // ================================
  // CREATE Service
  // ================================
  async create(dto: CreateServiceDto) {
    // تحقق من عدم تكرار اسم الخدمة
    const exists = await this.serviceRepo.findOne({ where: { name: dto.name } });
    if (exists) throw new ConflictException('Service with this name already exists');

    const service = this.serviceRepo.create(dto);
    const saved = await this.serviceRepo.save(service);
    return {
      message: 'Service created successfully',
      data: saved,
    };
  }

  // ================================
  // GET ALL Services
  // ================================
  async findAll() {
    const services = await this.serviceRepo.find();
    return {
      message: 'Services fetched successfully',
      data: services,
    };
  }

  // ================================
  // GET ONE Service
  // ================================
  async findOne(id: number) {
    const service = await this.serviceRepo.findOne({ where: { id } });
    if (!service) throw new NotFoundException(`Service with ID ${id} not found`);
    return {
      message: 'Service fetched successfully',
      data: service,
    };
  }

  // ================================
  // UPDATE Service
  // ================================
  async update(id: number, dto: UpdateServiceDto) {
    const service = await this.serviceRepo.findOne({ where: { id } });
    if (!service) throw new NotFoundException(`Service with ID ${id} not found`);

    Object.assign(service, dto);
    const updated = await this.serviceRepo.save(service);
    return {
      message: 'Service updated successfully',
      data: updated,
    };
  }

  // ================================
  // DELETE Service
  // ================================
  async remove(id: number) {
    const service = await this.serviceRepo.findOne({ where: { id } });
    if (!service) throw new NotFoundException(`Service with ID ${id} not found`);

    await this.serviceRepo.remove(service);
    return {
      message: 'Service removed successfully',
      data: service,
    };
  }
}
