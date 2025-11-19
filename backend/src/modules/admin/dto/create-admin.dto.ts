// import { IsString, IsEmail, MinLength, IsNotEmpty, Matches } from 'class-validator';

// export class CreateAdminDto {
//   // Data Transfer Object for creating a new admin user
//   @IsString() // Validate that userName is a string
//   @IsNotEmpty() // Validate that userName is not empty
//   userName: string; // Admin username

//   @IsString()
//   @IsNotEmpty()
//   firstName: string; // Admin first name

//   @IsString()
//   @IsNotEmpty()
//   lastName: string; // Admin last name

//   @IsEmail()
//   @IsNotEmpty()
//   email: string; // Admin email address

//   @IsString()
//   @IsNotEmpty()
//   @MinLength(6) // Minimum length of 6 characters for password
//   @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/, { 
//     message: 'Password too weak'  // Password must contain at least one letter and one number
//   })
//   password: string; // Admin password
// }

import {
  IsString,
  IsEmail,
  MinLength,
  IsNotEmpty,
  Matches,
} from 'class-validator';

export class CreateAdminDto {
  // Data Transfer Object for creating a new admin user

  @IsString()
  @IsNotEmpty()
  userName!: string; // Admin username

  @IsString()
  @IsNotEmpty()
  firstName!: string; // Admin first name

  @IsString()
  @IsNotEmpty()
  lastName!: string; // Admin last name

  @IsEmail()
  @IsNotEmpty()
  email!: string; // Admin email address

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/, {
    message: 'Password too weak',
  })
  password!: string; // Admin password
}
