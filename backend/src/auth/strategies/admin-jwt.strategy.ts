// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
//   constructor(config: ConfigService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: config.get<string>('JWT_ADMIN_SECRET'),
//     });
//   }

//   async validate(payload: any) {
//     // البيانات الراجعة ستكون في request.user
//     return {
//       id: payload.sub,
//       role: 'admin',
//       userName: payload.userName,
//     };
//   }
// }
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../jwt.constants';

interface AdminJwtPayload {
  sub: number;
  userName: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor() {
    if (!jwtConstants.adminSecret) {
      throw new Error('JWT_ADMIN_SECRET is not defined in jwt.constants.ts');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.adminSecret,
      ignoreExpiration: false,
    });
  }

  validate(payload: AdminJwtPayload) {
    return { id: payload.sub, role: 'admin', userName: payload.userName };
  }
}
