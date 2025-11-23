import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { Appointment } from '../appointment/entities/appointment.entity';
import { Customer } from '../customer/entities/customer.entity';
import { Saloon } from '../saloon/entities/saloon.entity';
import { Employee } from '../employee/entities/employee.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    @InjectRepository(Saloon)
    private readonly saloonRepo: Repository<Saloon>,
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) {}

  async createReview(
    dto: CreateReviewDto,
    customerId: number,
  ): Promise<Review | Review[]> {
    // التحقق من الزبون
    const customer = await this.customerRepo.findOne({
      where: { id: customerId },
    });
    if (!customer) throw new NotFoundException('Customer not found');

    // التحقق من الحجز
    const appointment = await this.appointmentRepo.findOne({
      where: { id: dto.appointmentId, customer: { id: customerId } },
      relations: ['employee', 'saloon'],
    });
    if (!appointment)
      throw new NotFoundException(
        'Appointment not found or does not belong to customer',
      );

    const reviews: Review[] = [];

    // تقييم الصالون إذا أرسل saloonId
    if (dto.saloonId) {
      const saloon = await this.saloonRepo.findOne({
        where: { id: dto.saloonId },
      });
      if (!saloon) throw new NotFoundException('Saloon not found');

      const existingSaloonReview = await this.reviewRepo.findOne({
        where: {
          appointment: { id: dto.appointmentId },
          saloon: { id: dto.saloonId },
        },
      });
      if (existingSaloonReview)
        throw new BadRequestException(
          'This appointment already has a saloon review',
        );

      const saloonReview = this.reviewRepo.create({
        rating: dto.rating,
        comment: dto.comment,
        customer,
        saloon,
        appointment,
      });
      reviews.push(await this.reviewRepo.save(saloonReview));
    }

    // تقييم الموظف إذا أرسل employeeId
    if (dto.employeeId) {
      const employee = await this.employeeRepo.findOne({
        where: { id: dto.employeeId },
      });
      if (!employee) throw new NotFoundException('Employee not found');

      const existingEmployeeReview = await this.reviewRepo.findOne({
        where: {
          appointment: { id: dto.appointmentId },
          employee: { id: dto.employeeId },
        },
      });
      if (existingEmployeeReview)
        throw new BadRequestException(
          'This appointment already has an employee review',
        );

      const employeeReview = this.reviewRepo.create({
        rating: dto.rating,
        comment: dto.comment,
        customer,
        employee,
        appointment,
      });
      reviews.push(await this.reviewRepo.save(employeeReview));
    }

    if (reviews.length === 0)
      throw new BadRequestException(
        'You must provide at least saloonId or employeeId',
      );

    return reviews.length === 1 ? reviews[0] : reviews;
  }

  async findAll(): Promise<Review[]> {
    return this.reviewRepo.find({
      relations: ['customer', 'saloon', 'employee', 'appointment'],
    });
  }

  async getReview(id: number): Promise<Review> {
    const review = await this.reviewRepo.findOne({
      where: { id },
      relations: ['customer', 'saloon', 'employee', 'appointment'],
    });
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async remove(id: number): Promise<void> {
    const review = await this.reviewRepo.findOne({ where: { id } });
    if (!review) throw new NotFoundException('Review not found');
    await this.reviewRepo.remove(review);
  }
}
