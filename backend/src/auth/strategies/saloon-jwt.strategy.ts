// src/modules/saloon/strategies/saloon.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Saloon } from '../../modules/saloon/entities/saloon.entity';

@Injectable()
export class SaloonStrategy extends PassportStrategy(Strategy, 'saloon-jwt') {
  constructor(
    @InjectRepository(Saloon)
    private readonly saloonRepo: Repository<Saloon>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
secretOrKey: process.env.SALOON_JWT_SECRET || 'default_saloon_secret',
    });
  }

  async validate(payload: { id: number }) {
    const saloon = await this.saloonRepo.findOne({ where: { id: payload.id } });

    if (!saloon) {
      throw new UnauthorizedException('Saloon not found');
    }

    return saloon; 
  }
}
