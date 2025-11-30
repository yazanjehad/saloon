// src/modules/employee-weekly-schedule/guards/employee.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class EmployeeGuard extends AuthGuard('employee-jwt') {}
