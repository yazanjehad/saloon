import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
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
  saloonId?: number;

  @IsNumber()
  @IsOptional()
  employeeId?: number;
}
