// src/modules/services/strategies/admin-jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {AdminSaloon} from '../../modules/admin/entities/admin.entity'
import { jwtConstants } from '../jwt.constants';
@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(
    @InjectRepository(AdminSaloon)
    private readonly adminRepo: Repository<AdminSaloon>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.adminSecret || 'defaultAdminSecret',
    });
  }

  async validate(payload: { id: number }) {
    const admin = await this.adminRepo.findOne({ where: { id: payload.id } });
    if (!admin) {
      throw new UnauthorizedException('Admin not found');
    }
    return admin; // بيرجع للـ request.user
  }
}
