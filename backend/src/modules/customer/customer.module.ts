import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from './entities/customer.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomerJwtStrategy } from 'src/auth/strategies/customer-jwt.strategy'; // ← أضف هذا

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_CUSTOMER_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerJwtStrategy], 
  exports: [CustomerService],
})
export class CustomerModule {}
