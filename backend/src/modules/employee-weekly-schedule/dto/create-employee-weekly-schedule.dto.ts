import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEmployeeWeeklyScheduleDto {
  @IsEnum(['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'], { message: 'Day must be a valid weekday' })
  day: string;

  @IsOptional()
  @IsString()
  startTime?: string;

  @IsOptional()
  @IsString()
  endTime?: string;

  @IsOptional()
  @IsBoolean()
  isWorking?: boolean = true;

  @IsNotEmpty({ message: 'Employee ID is required' })
  @IsNumber({}, { message: 'Employee ID must be a number' })
  employeeId: number;   

  @IsOptional()
  @IsString()
  notes?: string;
}
