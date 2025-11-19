import { AuthGuard } from '@nestjs/passport';
export class CustomerGuard extends AuthGuard('customer-jwt') {}
