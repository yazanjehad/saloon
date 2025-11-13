import { Module } from '@nestjs/common';
import { SaloonService } from './saloon.service';
import { SaloonController } from './saloon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Saloon } from './entities/saloon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Saloon])],
  controllers: [SaloonController],
  providers: [SaloonService],
  exports: [SaloonService],
})
export class SaloonModule {}
