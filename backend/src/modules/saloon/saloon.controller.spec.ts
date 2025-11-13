import { Test, TestingModule } from '@nestjs/testing';
import { SaloonController } from './saloon.controller';
import { SaloonService } from './saloon.service';

describe('SaloonController', () => {
  let controller: SaloonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaloonController],
      providers: [SaloonService],
    }).compile();

    controller = module.get<SaloonController>(SaloonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
