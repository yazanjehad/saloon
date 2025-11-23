// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { jwtConstants } from '../jwt.constants';

// interface AdminJwtPayload {
//   sub: number;
//   userName: string;
// }

// @Injectable()
// export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
//   constructor() {
//     if (!jwtConstants.adminSecret) {
//       throw new Error('❌ Missing JWT_ADMIN_SECRET in environment variables.');
//     }

//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       // secretOrKey: jwtConstants.adminSecret,
//       secretOrKey: process.env.JWT_ADMIN_SECRET!,

//       ignoreExpiration: false, 
//     });
//   }

//   validate(payload: AdminJwtPayload) {
//     if (!payload || !payload.sub) {
//       throw new UnauthorizedException('Invalid admin token');
//     }

//     return {
//       id: payload.sub,
//       userName: payload.userName,
//       role: 'admin',
//     };
//   }
// }

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(configService: ConfigService) {
    const secret = configService.get<string>('JWT_ADMIN_SECRET');
    if (!secret) {
      throw new Error('❌ Missing JWT_ADMIN_SECRET in environment variables.');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

async validate(payload: any) {
  if (!payload || !payload.sub) {
    throw new UnauthorizedException();
  }
  return { id: payload.sub, userName: payload.userName };
}

}
