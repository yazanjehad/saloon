import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../jwt.constants';

interface EmployeeJwtPayload {
  sub: number;
  userName: string;
}

@Injectable()
export class EmployeeJwtStrategy extends PassportStrategy(Strategy, 'emp-jwt') {
  constructor() {
    if (!jwtConstants.employeeSecret) {
      throw new Error('❌ Missing JWT_EMP_SECRET in environment variables.');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.employeeSecret,
      ignoreExpiration: false, 
    });
  }

  validate(payload: EmployeeJwtPayload) {
    if (!payload || !payload.sub) {
      throw new UnauthorizedException('Invalid employee token');
    }

    return {
      id: payload.sub,
      userName: payload.userName,
      role: 'employee',
    };
  }
} 