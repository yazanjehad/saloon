import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeWeeklyScheduleDto } from './create-employee-weekly-schedule.dto';

export class UpdateEmployeeWeeklyScheduleDto extends PartialType(CreateEmployeeWeeklyScheduleDto) {}
