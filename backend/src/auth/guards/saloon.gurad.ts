// src/modules/saloon/guards/saloon.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SaloonGuard extends AuthGuard('saloon-jwt') {}
