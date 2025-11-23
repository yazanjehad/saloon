// src/modules/saloon/saloon.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Saloon } from './entities/saloon.entity';
import { SaloonService } from './saloon.service';
import { SaloonController } from './saloon.controller';
import { SaloonStrategy } from '../../auth/strategies/saloon-jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Saloon]),
    JwtModule.register({
      secret: process.env.JWT_SALOON_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [SaloonController],
  providers: [SaloonService , SaloonStrategy],
  exports: [SaloonService],
})
export class SaloonModule {}
