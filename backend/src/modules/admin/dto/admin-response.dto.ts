export class AdminResponseDto {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  imageUrl?: string;
  saloons?: any[];

  constructor(admin: any) {
    this.id = admin.id;
    this.userName = admin.userName;
    this.firstName = admin.firstName;
    this.lastName = admin.lastName;
    this.email = admin.email;
    this.phone = admin.phone;
    this.imageUrl = admin.imageUrl;
    this.saloons = admin.saloons;
  }
}
