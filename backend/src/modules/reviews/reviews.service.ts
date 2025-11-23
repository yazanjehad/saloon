import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { Saloon } from '../saloon/entities/saloon.entity';
import { Employee } from '../employee/entities/employee.entity';
import { Customer } from '../customer/entities/customer.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
    @InjectRepository(Saloon)
    private readonly saloonRepo: Repository<Saloon>,
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}

  async createReview(
    dto: CreateReviewDto,
    customerId: number,
  ): Promise<Review | Review[]> {
    // التأكد أن الزبون موجود
    const customer = await this.customerRepo.findOne({
      where: { id: customerId },
    });
    if (!customer) throw new NotFoundException('Customer not found');

    const reviews: Review[] = [];

    // إذا أرسل saloonId أنشئ تقييم الصالون
    if (dto.saloonId) {
      const saloon = await this.saloonRepo.findOne({
        where: { id: dto.saloonId },
      });
      if (!saloon) throw new NotFoundException('Saloon not found');

      const saloonReview = this.reviewRepo.create({
        rating: dto.rating,
        comment: dto.comment,
        customer,
        saloon,
        employeeId: dto.employeeId,
      });
      reviews.push(await this.reviewRepo.save(saloonReview));
    }

    // إذا أرسل employeeId أنشئ تقييم الموظف
    if (dto.employeeId) {
      const employee = await this.employeeRepo.findOne({
        where: { id: dto.employeeId },
      });
      if (!employee) throw new NotFoundException('Employee not found');

      const employeeReview = this.reviewRepo.create({
        rating: dto.rating,
        comment: dto.comment,
        customer,
        employee,
        employeeId: dto.employeeId,
      });
      reviews.push(await this.reviewRepo.save(employeeReview));
    }

    // إرجاع تقييم واحد أو مصفوفة حسب الطلب
    if (reviews.length === 1) return reviews[0];
    return reviews;
  }

  async findAll(): Promise<Review[]> {
    return this.reviewRepo.find({
      relations: ['customer', 'saloon', 'employee'],
    });
  }

  async getReview(id: number): Promise<Review> {
    const review = await this.reviewRepo.findOne({
      where: { id },
      relations: ['customer', 'saloon', 'employee'],
    });
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async findAllBySaloon(saloonId: number): Promise<Review[]> {
    return this.reviewRepo.find({
      where: { saloon: { id: saloonId } },
      relations: ['customer', 'saloon', 'employee'],
    });
  }

  async remove(id: number): Promise<void> {
    const review = await this.reviewRepo.findOne({ where: { id } });
    if (!review) throw new NotFoundException('Review not found');
    await this.reviewRepo.remove(review);
  }
}
