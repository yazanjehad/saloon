import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
import { ReviewService } from './reviews.service';
import { Get, Delete } from '@nestjs/common';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // إنشاء تقييم، customerId يمكن الحصول عليه من الـ JWT أو من param
  @Post(':customerId')
  async createReview(
    @Param('customerId', ParseIntPipe) customerId: number, // تأكد أنه رقم
    @Body() dto: CreateReviewDto,
  ): Promise<Review | Review[]> {
    // تعديل هنا لقبول Review أو مصفوفة
    return this.reviewService.createReview(dto, customerId);
  }
  @Get(':id')
  async getReview(@Param('id', ParseIntPipe) id: number): Promise<Review> {
    return this.reviewService.getReview(id);
  }
  @Get()
  async findAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.remove(id);
    await this.reviewService.remove(id);
    return { message: 'Review deleted successfully' };
  }
}
