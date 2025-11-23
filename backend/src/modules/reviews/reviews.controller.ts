import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Get,
  Delete,
} from '@nestjs/common';
import { ReviewService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post(':customerId')
  async createReview(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() dto: CreateReviewDto,
  ): Promise<Review | Review[]> {
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
    await this.reviewService.remove(id);
    return { message: 'Review deleted successfully' };
  }
}
