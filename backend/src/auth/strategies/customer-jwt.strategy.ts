// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { jwtConstants } from '../jwt.constants';

// @Injectable()
// export class CustomerJwtStrategy extends PassportStrategy(Strategy, 'customer-jwt') {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: jwtConstants.customerSecret,
//     });
//   }

//   async validate(payload: any) {
//     return { id: payload.sub, role: 'customer' };
//   }
// }
