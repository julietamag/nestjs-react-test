import { Test, TestingModule } from '@nestjs/testing';
import { CommsController } from './comms.controller';
import { NextDelivery } from '../common/types';
import { CommsService } from './comms.service';
import { NotFoundException } from '@nestjs/common';

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
    const result: NextDelivery = {
      title: 'Your next delivery for Ricky and Pip',
      message:
        "Hey Julieta! In two days' time, we'll be charging you for your next order for Ricky and Pip's fresh food.",
      totalPrice: 100,
      freeGift: false,
    };

    jest.spyOn(mockService, 'getNextDelivery').mockReturnValue(result);

    expect(controller.getNextDelivery('user1')).toBe(result);
  });

  it('should return not found response when user does not exists', () => {
    mockService.getNextDelivery.mockImplementation(() => {
      throw new NotFoundException('User not found');
    });

    expect(() => controller.getNextDelivery('fail')).toThrow(NotFoundException);
  });
});
