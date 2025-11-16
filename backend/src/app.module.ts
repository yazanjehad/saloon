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
<<<<<<< HEAD
import {ServicesModule} from './modules/services/services.module'
=======
import { ServicesModule } from './modules/services/services.module';

>>>>>>> bbb95d8d96e430da4976aad9c5ecb5c3337be4d6
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
  ],
})
export class AppModule {}
