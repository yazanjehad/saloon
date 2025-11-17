import { IsString, IsEmail, MinLength, IsNotEmpty, Matches } from 'class-validator';
export class CreateCustomerDto {
    @IsString()
@IsNotEmpty()
userName: string; // Customer username

@IsString()
@IsNotEmpty()
firstName: string; // Customer first name      

@IsString()
@IsNotEmpty()
lastName: string; // Customer last name 

@IsEmail()
@IsNotEmpty()
email: string; // Customer email address

 @IsString()
  @IsNotEmpty()
  @MinLength(6) // Minimum length of 6 characters for password
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/, { 
    message: 'Password too weak'  // Password must contain at least one letter and one number
  })
  password: string; // Admin password

}


