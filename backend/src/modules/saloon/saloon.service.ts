import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Saloon } from './entities/saloon.entity';
import { CreateSaloonDto } from './dto/create-saloon.dto';
import { UpdateSaloonDto } from './dto/update-saloon.dto';
import { SaloonResponseDto } from './dto/saloon-response.dto';
import { SaloonMessages } from 'src/common/error-messages';

@Injectable()
export class SaloonService {
  constructor(
    @InjectRepository(Saloon)
    private readonly saloonRepo: Repository<Saloon>,
  ) {}

  async create(dto: CreateSaloonDto) {
    const exists = await this.saloonRepo.findOne({ where: { name: dto.name } });
    if (exists) throw new ConflictException(SaloonMessages.DUPLICATE_NAME);

    const saloon = this.saloonRepo.create({ ...dto, admin: { id: dto.adminId } });
    const saved = await this.saloonRepo.save(saloon);
    return new SaloonResponseDto(saved);
  }

  async findAll() {
    const saloons = await this.saloonRepo.find({ relations: ['employees', 'services', 'admin', 'reviews'] });
    return saloons.map(s => new SaloonResponseDto(s));
  }

  async findOne(id: number) {
    const saloon = await this.saloonRepo.findOne({ where: { id }, relations: ['employees', 'services', 'admin', 'reviews'] });
    if (!saloon) throw new NotFoundException(SaloonMessages.NOT_FOUND);
    return new SaloonResponseDto(saloon);
  }

  async update(id: number, dto: UpdateSaloonDto) {
    const saloon = await this.saloonRepo.findOne({ where: { id } });
    if (!saloon) throw new NotFoundException(SaloonMessages.NOT_FOUND);

    Object.assign(saloon, dto);
    const updated = await this.saloonRepo.save(saloon);
    return new SaloonResponseDto(updated);
  }

  async remove(id: number) {
    const saloon = await this.saloonRepo.findOne({ where: { id } });
    if (!saloon) throw new NotFoundException(SaloonMessages.NOT_FOUND);

    await this.saloonRepo.remove(saloon);
    return new SaloonResponseDto(saloon);
  }
}
