import {
  IsString,
  IsEmail,
  MinLength,
  IsNotEmpty,
  Matches,
  IsIn,
  IsOptional,
} from 'class-validator';

export class CreateCustomerDto {
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
  @MinLength(6)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/, {
    message: 'Password too weak',
  })
  password: string;

  @Matches(/^[0-9]{10,15}$/, {
    message: 'Phone must be between 10 and 15 digits',
  })
  phone: string;

  @IsIn(['Male', 'Female'])
  gender: 'Male' | 'Female';

  @IsOptional()
  @IsString()
  @Matches(/^(https?:\/\/.*\.(?:png|jpg|jpeg|webp|gif))$/i, {
    message: 'Invalid image URL format',
  })
  imageUrl?: string;
}
