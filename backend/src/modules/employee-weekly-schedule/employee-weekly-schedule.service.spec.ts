import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeWeeklyScheduleService } from './employee-weekly-schedule.service';

describe('EmployeeWeeklyScheduleService', () => {
  let service: EmployeeWeeklyScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeWeeklyScheduleService],
    }).compile();

    service = module.get<EmployeeWeeklyScheduleService>(EmployeeWeeklyScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
