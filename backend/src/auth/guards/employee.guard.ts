import { AuthGuard } from '@nestjs/passport';
export class EmployeeGuard extends AuthGuard('employee-jwt') {}
