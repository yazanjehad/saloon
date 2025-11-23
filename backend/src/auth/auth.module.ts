// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { AdminJwtStrategy } from './strategies/admin-jwt.strategy';
// import { adminGuard } from './guards/admin.gurad';

// @Module({
//   imports: [
//     ConfigModule,
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (config: ConfigService) => {
//         const secret = config.get<string>('JWT_ADMIN_SECRET');
//         if (!secret) throw new Error('❌ Missing JWT_ADMIN_SECRET in environment variables.');

//         // تحويل مدة الانتهاء من string إلى number (مثلاً 7 أيام بالثواني)
//         const expiresIn = Number(config.get<string>('JWT_EXPIRATION_SECONDS')) || 604800;

//         return {
//           secret,
//           signOptions: {
//             expiresIn, // الآن من النوع number
//           },
//         };
//       },
//     }),
//   ],
//   providers: [AdminJwtStrategy, adminGuard],
//   exports: [JwtModule, adminGuard],
// })
// export class AuthModule {}
// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminJwtStrategy } from './strategies/admin-jwt.strategy';
import { adminGuard } from './guards/admin.gurad';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_ADMIN_SECRET');
        if (!secret) throw new Error('❌ Missing JWT_ADMIN_SECRET in environment variables.');
        const expiresIn = Number(config.get<string>('JWT_EXPIRATION_SECONDS')) || 604800;
        return {
          secret,
          signOptions: { expiresIn },
        };
      },
    }),
  ],
  providers: [AdminJwtStrategy, adminGuard],
  exports: [JwtModule, adminGuard],
})
export class AuthModule {}
