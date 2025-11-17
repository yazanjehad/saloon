import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeWeeklyScheduleController } from './employee-weekly-schedule.controller';
import { EmployeeWeeklyScheduleService } from './employee-weekly-schedule.service';

describe('EmployeeWeeklyScheduleController', () => {
  let controller: EmployeeWeeklyScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeWeeklyScheduleController],
      providers: [EmployeeWeeklyScheduleService],
    }).compile();

    controller = module.get<EmployeeWeeklyScheduleController>(EmployeeWeeklyScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
