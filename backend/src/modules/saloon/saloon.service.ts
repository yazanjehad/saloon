// import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Saloon } from './entities/saloon.entity';
// import { CreateSaloonDto } from './dto/create-saloon.dto';
// import { UpdateSaloonDto } from './dto/update-saloon.dto';

// @Injectable()
// export class SaloonService {
//   constructor(
//     @InjectRepository(Saloon)
//     private readonly saloonRepo: Repository<Saloon>,
//   ) {}

//   // ================================
//   // CREATE Saloon
//   // ================================
//   async create(dto: CreateSaloonDto) {
//     const exists = await this.saloonRepo.findOne({ where: { name: dto.name } });
//     if (exists) throw new ConflictException('Saloon with this name already exists');

//     const saloon = this.saloonRepo.create(dto);
//     const saved = await this.saloonRepo.save(saloon);

//     return saved; // فقط ترجع البيانات دون تغليفها برسالة
//   }

//   // ================================
//   // GET ALL Saloons
//   // ================================
//   async findAll() {
//     return this.saloonRepo.find({ relations: ['employees', 'services', 'admin'] });
//   }

//   // ================================
//   // GET ONE Saloon
//   // ================================
//   async findOne(id: number) {
//     const saloon = await this.saloonRepo.findOne({
//       where: { id },
//       relations: ['employees', 'services', 'admin'],
//     });
//     if (!saloon) throw new NotFoundException('Saloon not found');
//     return saloon;
//   }

//   // ================================
//   // UPDATE Saloon
//   // ================================
//   async update(id: number, dto: UpdateSaloonDto) {
//     const saloon = await this.findOne(id);
//     Object.assign(saloon, dto); // تعديل مباشرة على الكائن الموجود
//     return this.saloonRepo.save(saloon);
//   }

//   // ================================
//   // DELETE Saloon
//   // ================================
//   async remove(id: number) {
//     const saloon = await this.findOne(id);
//     await this.saloonRepo.remove(saloon);
//     return saloon; // ترجع الكائن المحذوف
//   }
// }


import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Saloon } from './entities/saloon.entity';
import { CreateSaloonDto } from './dto/create-saloon.dto';
import { UpdateSaloonDto } from './dto/update-saloon.dto';
import { SaloonResponseDto } from './dto/saloon-response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SaloonService {
  constructor(
    @InjectRepository(Saloon)
    private readonly saloonRepo: Repository<Saloon>,
    private readonly jwtService: JwtService,
  ) {}

  // ================================
  // CREATE Saloon
  // ================================
  async create(dto: CreateSaloonDto) {
    const exists = await this.saloonRepo.findOne({ where: { name: dto.name } });
    if (exists) throw new ConflictException('Saloon with this name already exists');

    const saloon = this.saloonRepo.create(dto);
    const saved = await this.saloonRepo.save(saloon);

    // انشاء JWT للصالون
    const token = this.jwtService.sign(
      { sub: saved.id },
      { secret: process.env.JWT_SALOON_SECRET },
    );

    return {
      message: 'Saloon created successfully',
      data: new SaloonResponseDto(saved),
      token,
    };
  }

  // ================================
  // GET ALL Saloons
  // ================================
  async findAll() {
    const saloons = await this.saloonRepo.find({ relations: ['employees', 'services', 'admin'] });
    return {
      message: 'Saloons fetched successfully',
      data: saloons.map(s => new SaloonResponseDto(s)),
    };
  }

  // ================================
  // GET ONE Saloon
  // ================================
  async findOne(id: number) {
    const saloon = await this.saloonRepo.findOne({
      where: { id },
      relations: ['employees', 'services', 'admin'],
    });
    if (!saloon) throw new NotFoundException('Saloon not found');

    return {
      message: 'Saloon fetched successfully',
      data: new SaloonResponseDto(saloon),
    };
  }

  async findRaw(id: number) {
  return await this.saloonRepo.findOne({
    where: { id },
    relations: ['employees', 'services', 'admin'],
  });
}

  // ================================
  // UPDATE Saloon
  // ================================
  async update(id: number, dto: UpdateSaloonDto) {
    const saloon = await this.saloonRepo.findOne({ where: { id } });
    if (!saloon) throw new NotFoundException('Saloon not found');

    Object.assign(saloon, dto); // نسخ الحقول الموجودة فقط
    const updated = await this.saloonRepo.save(saloon);

    return {
      message: 'Saloon updated successfully',
      data: new SaloonResponseDto(updated),
    };
  }

  // ================================
  // DELETE Saloon
  // ================================
  async remove(id: number) {
    const saloon = await this.saloonRepo.findOne({ where: { id } });
    if (!saloon) throw new NotFoundException('Saloon not found');

    await this.saloonRepo.remove(saloon);
    return {
      message: 'Saloon removed successfully',
      data: new SaloonResponseDto(saloon),
    };
  }
}

