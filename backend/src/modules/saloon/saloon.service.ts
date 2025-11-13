import { Injectable } from '@nestjs/common';
import { CreateSaloonDto } from './dto/create-saloon.dto';
import { UpdateSaloonDto } from './dto/update-saloon.dto';

@Injectable()
export class SaloonService {
  create(createSaloonDto: CreateSaloonDto) {
    return 'This action adds a new saloon';
  }

  findAll() {
    return `This action returns all saloon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saloon`;
  }

  update(id: number, updateSaloonDto: UpdateSaloonDto) {
    return `This action updates a #${id} saloon`;
  }

  remove(id: number) {
    return `This action removes a #${id} saloon`;
  }
}
