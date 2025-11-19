// // import { Module } from '@nestjs/common';
// // import { JwtModule } from '@nestjs/jwt';
// // import { ConfigModule, ConfigService } from '@nestjs/config';

// // // Strategies
// // import { AdminJwtStrategy } from './strategies/admin-jwt.strategy';
// // import { EmployeeJwtStrategy } from './strategies/employee-jwt.strategy';
// // import { UserJwtStrategy } from './strategies/user-jwt.strategy';
// // import { SuperAdminJwtStrategy } from './strategies/superadmin-jwt.strategy';

// // // Guards
// // import { AdminGuard } from './guards/admin.guard';
// // import { EmployeeGuard } from './guards/employee.guard';
// // import { UserGuard } from './guards/user.guard';
// // import { SuperAdminGuard } from './guards/superadmin.guard';

// // @Module({
// //   imports: [
// //     ConfigModule, // يسمح باستخدام .env داخل هذا الموديول

// //     // تسجيل JwtModule بشكل عام ليُستخدم في باقي الخدمات
// //     JwtModule.registerAsync({
// //       imports: [ConfigModule],
// //       inject: [ConfigService],

// //       useFactory: async (config: ConfigService) => ({
// //         secret: config.get<string>('JWT_ADMIN_SECRET'), // قيمة افتراضية
// //         signOptions: {
// //           expiresIn: config.get<string>('JWT_EXPIRATION') || '7d',
// //         },
// //       }),
// //     }),
// //   ],

// //   providers: [
// //     // Strategies
// //     AdminJwtStrategy,
// //     EmployeeJwtStrategy,
// //     UserJwtStrategy,
// //     SuperAdminJwtStrategy,

// //     // Guards
// //     AdminGuard,
// //     EmployeeGuard,
// //     UserGuard,
// //     SuperAdminGuard,
// //   ],

// //   exports: [
// //     JwtModule,
// //     AdminGuard,
// //     EmployeeGuard,
// //     UserGuard,
// //     SuperAdminGuard,
// //   ],
// // })
// // export class AuthModule {}
// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule } from '@nestjs/config';

// // Strategies
// import { AdminJwtStrategy } from './strategies/admin-jwt.strategy';
// // import { EmployeeJwtStrategy } from './strategies/emp-jwt.strategy';
// // import { CustomerJwtStrategy } from './strategies/custmer-jwt.strategy';

// // Guards
// import { AdminGuard } from './guards/admin.guard';
// // import { EmployeeGuard } from './guards/employee.guard';
// // import { CustomerGuard } from './guards/customer.guard';

// @Module({
//   imports: [ConfigModule, JwtModule.register({})],

//   providers: [
//     // Strategies
//     AdminJwtStrategy,
//     // EmployeeJwtStrategy,
//     // CustomerJwtStrategy,

//     // Guards
//     AdminGuard,
//     // EmployeeGuard,
//     // CustomerGuard,
//   ],

//   exports: [JwtModule, AdminGuard], //EmployeeGuard, CustomerGuard],
// })
// export class AuthModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Strategies
import { AdminJwtStrategy } from './strategies/admin-jwt.strategy';

// Guards
import { AdminGuard } from './guards/admin.guard';

@Module({
  imports: [
    ConfigModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_ADMIN_SECRET') || 'defaultAdminSecret',
        signOptions: {
          expiresIn: '7d',
        },
      }),
    }),
  ],

  providers: [AdminJwtStrategy, AdminGuard],

  exports: [JwtModule, AdminGuard],
})
export class AuthModule {}
