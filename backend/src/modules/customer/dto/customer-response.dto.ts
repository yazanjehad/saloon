import { Customer } from '../entities/customer.entity';

export class CustomerResponseDto {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(customer: Customer) {
    this.id = customer.id;
    this.userName = customer.userName;
    this.firstName = customer.firstName;
    this.lastName = customer.lastName;
    this.email = customer.email;
    this.phone = customer.phone;
    this.gender = customer.gender;
    this.imageUrl = customer.imageUrl;
    this.createdAt = customer.createdAt;
    this.updatedAt = customer.updatedAt;
  }
}
