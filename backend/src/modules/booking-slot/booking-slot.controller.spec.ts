import { Test, TestingModule } from '@nestjs/testing';
import { BookingSlotController } from './booking-slot.controller';
import { BookingSlotService } from './booking-slot.service';

describe('BookingSlotController', () => {
  let controller: BookingSlotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingSlotController],
      providers: [BookingSlotService],
    }).compile();

    controller = module.get<BookingSlotController>(BookingSlotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
