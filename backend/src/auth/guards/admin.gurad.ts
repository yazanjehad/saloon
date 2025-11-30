import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class adminGuard extends AuthGuard('admin-jwt') {} 