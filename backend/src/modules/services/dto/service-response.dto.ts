export class ServiceResponseDto {
  id: number;
  name: string;
  description?: string;
  durationMinutes: number;
  price: number;
  currency: string;
  category?: string;
  status: 'active' | 'inactive';
  imageUrl?: string;

  saloon: {
    id: number;
    name: string;
    address: string;
    city: string;
    phone: string;
    imageUrl?: string;
  };

    constructor(service: any) {
        this.id = service.id;
        this.name = service.name;
        this.description = service.description;
        this.durationMinutes = service.durationMinutes;
        this.price = service.price;
        this.currency = service.currency;
        this.category = service.category;
        this.status = service.status;
        this.imageUrl = service.imageUrl;
}
}
