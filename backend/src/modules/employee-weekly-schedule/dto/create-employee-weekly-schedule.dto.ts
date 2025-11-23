import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEmployeeWeeklyScheduleDto {
  @IsEnum(['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'])
  day: string;

  @IsOptional()
  @IsString()
  startTime?: string;

  @IsOptional()
  @IsString()
  endTime?: string;

  @IsOptional()
  @IsBoolean()
  isWorking?: boolean;

  @IsNotEmpty()
  @IsNumber()
  employee: number;

  // @IsNotEmpty()
  // @IsDateString()
  // date: string; // التاريخ الفعلي لهذا اليوم
}
