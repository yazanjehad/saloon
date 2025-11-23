import { IsString, IsEmail, IsNotEmpty, Length,IsBoolean,IsOptional } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  userName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 200)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(7, 15)
  phone: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;

  @IsNotEmpty()
  saloonId: number; 

   @IsOptional()
  @IsString()
  imageUrl?: string;
}
