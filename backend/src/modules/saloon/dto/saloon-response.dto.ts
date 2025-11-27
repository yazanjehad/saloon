// src/modules/saloon/dto/saloon-response.dto.ts
import { Saloon } from '../entities/saloon.entity';

export class SaloonResponseDto {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  imageUrl?: string;
  description?: string;
  openingHours?: string;
  rating: number;
  latitude?: number;
  longitude?: number;
  createdAt: Date;
  updatedAt: Date;
  admin_id?: number;
  employees: any[];
  reviews: any[];

  constructor(saloon: Saloon) {
    this.id = saloon.id;
    this.name = saloon.name;
    this.address = saloon.address;
    this.city = saloon.city;
    this.phone = saloon.phone;
    this.imageUrl = saloon.imageUrl ?? undefined;
    this.description = saloon.description ?? undefined;
    this.openingHours = saloon.openingHours ?? undefined;
    this.rating = saloon.rating;
    this.latitude = saloon.latitude ?? undefined;
    this.longitude = saloon.longitude ?? undefined;
    this.createdAt = saloon.createdAt;
    this.updatedAt = saloon.updatedAt;
    this.admin_id = saloon.admin?.id ?? undefined;
    this.employees = saloon.employees ?? [];
    this.reviews = saloon.reviews ?? [];
  }
}