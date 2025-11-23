import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  rating: number;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  @MinLength(5)
  comment?: string;

  @IsNumber()
  @IsOptional()
  saloonId?: number; // تقييم الصالون اختياري

  @IsNumber()
  @IsOptional()
  employeeId?: number; // تقييم الموظف اختياري

  @IsNumber()
  appointmentId: number; // الحجز إلزامي
}
