import { Test, TestingModule } from '@nestjs/testing';
import { CommsController } from './comms.controller';
import { NextDelivery } from '../common/types';
import { CommsService } from './comms.service';
import { NotFoundException } from '@nestjs/common';

const mockNextDelivery: NextDelivery = {
  title: 'Your next delivery for Milo and Luna',
  message:
    "Hey Julieta! In two days' time, we'll be charging you for your next order for Milo and Luna's fresh food.",
  totalPrice: 100,
  freeGift: false,
};

const mockService = {
  getNextDelivery: jest.fn(),
};

describe('CommsController', () => {
  let controller: CommsController;
  let service: CommsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommsController],
      providers: [{ provide: CommsService, useValue: mockService }],
    }).compile();

    controller = module.get<CommsController>(CommsController);
    service = module.get<CommsService>(CommsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return next delivery response when user exists', () => {
    mockService.getNextDelivery.mockReturnValue(mockNextDelivery);

    const result = controller.getNextDelivery('1');
    expect(result).toEqual(mockNextDelivery);
    expect(service.getNextDelivery).toHaveBeenCalledWith('1');
  });

  it('should return not found response when user does not exists', () => {
    mockService.getNextDelivery.mockImplementation(() => {
      throw new NotFoundException('User not found');
    });

    expect(() => controller.getNextDelivery('fail')).toThrow(NotFoundException);
  });
});
