import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from './config/app.config';
import { databaseConfig } from './config/database.config';

// Import feature modules
import { AdminModule } from './modules/admin/admin.module';
import { SaloonModule } from './modules/saloon/saloon.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { CustomerModule } from './modules/customer/customer.module';
import { ServicesModule } from './modules/services/services.module';
import { EmployeeWeeklyScheduleModule } from './modules/employee-weekly-schedule/employee-weekly-schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),
    AdminModule,
    SaloonModule,
    EmployeeModule,
    CustomerModule,
    ServicesModule,
    EmployeeWeeklyScheduleModule,
  ],
})
export class AppModule {}

