import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { CreateEmployeeWeeklyScheduleDto } from './create-employee-weekly-schedule.dto';

export class UpdateEmployeeWeeklyScheduleDto extends PartialType(CreateEmployeeWeeklyScheduleDto) {

 @IsOptional()
  @IsString()
  startTime?: string;

  @IsOptional()
  @IsString()
  endTime?: string;

  @IsOptional()
  @IsBoolean()
  isWorking?: boolean;



}
