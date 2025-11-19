import {
  IsString,
  IsEmail,
  MinLength,
  IsNotEmpty,
  Matches,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  userName!: string; // Customer username

  @IsString()
  @IsNotEmpty()
  firstName!: string; // Customer first name

  @IsString()
  @IsNotEmpty()
  lastName!: string; // Customer last name

  @IsEmail()
  @IsNotEmpty()
  email!: string; // Customer email address

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/, {
    message: 'Password too weak',
  })
  password!: string; // Customer password
}
