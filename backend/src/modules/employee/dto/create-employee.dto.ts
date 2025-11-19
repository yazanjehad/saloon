import {
  IsString,
  IsEmail,
  MinLength,
  IsNotEmpty,
  Matches,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  userName!: string; // Employee username

  @IsString()
  @IsNotEmpty()
  firstName!: string; // Employee first name

  @IsString()
  @IsNotEmpty()
  lastName!: string; // Employee last name

  @IsEmail()
  @IsNotEmpty()
  email!: string; // Employee email address

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/, {
    message: 'Password too weak',
  })
  password!: string; // Employee password
}
