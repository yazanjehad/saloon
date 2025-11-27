import { 
  IsString, 
  IsEmail, 
  MinLength, 
  IsNotEmpty, 
  Matches, 
  IsOptional, 
  IsBoolean, 
  IsNumber 
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).+$/, {
    message: 'Password must contain uppercase, lowercase, number, and special character',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{10,15}$/, {
    message: 'Phone must be between 10 and 15 digits',
  })
  phone: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;

  @IsNumber()
  @IsNotEmpty()
  saloonId: number;

  @IsString()
  @IsOptional()
  @Matches(/^(https?:\/\/.*\.(?:png|jpg|jpeg|webp|gif))$/i, {
    message: 'Invalid image URL format',
  })
  imageUrl?: string;
}
