// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { jwtConstants } from '../jwt.constants';

// @Injectable()
// export class EmployeeJwtStrategy extends PassportStrategy(Strategy, 'employee-jwt') {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: jwtConstants.employeeSecret,
//     });
//   }

//   validate(payload: any) {
//     return { id: payload.sub, role: 'employee' };
//   }
// }
