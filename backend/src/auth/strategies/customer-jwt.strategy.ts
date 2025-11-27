import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CustomerService } from 'src/modules/customer/customer.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomerJwtStrategy extends PassportStrategy(Strategy, 'customer-jwt') {
  constructor(
    private readonly customerService: CustomerService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_CUSTOMER_SECRET')!, 
    });
  }

  async validate(payload: { id: number }) {
    const customer = await this.customerService.findOne(payload.id);
    if (!customer) throw new UnauthorizedException('Invalid token');

    return customer; // بيرجع داخل req.user
  }
}
