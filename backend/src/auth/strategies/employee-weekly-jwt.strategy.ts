import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

interface EmployeeJwtPayload {
  sub: number;
  userName: string;
}

@Injectable()
export class EmployeeJwtStrategy extends PassportStrategy(Strategy, 'employee-jwt') {
  constructor(configService: ConfigService) {
    const secret = configService.get<string>('JWT_EMPLOYEE_SECRET');
    if (!secret) throw new Error('❌ Missing JWT_EMPLOYEE_SECRET in environment variables.');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: EmployeeJwtPayload) {
    if (!payload || !payload.sub) throw new UnauthorizedException();
    return { id: payload.sub, userName: payload.userName };
  }
}
