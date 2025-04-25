const mockUsers: User[] = [
  {
    id: 'user1',
    firstName: 'Julieta',
    lastName: 'Doe',
    email: 'julieta@test.com',
    cats: [
      {
        name: 'Ricky',
        pouchSize: 'A',
        subscriptionActive: true,
        breed: 'Persian',
      },
      {
        name: 'Pip',
        pouchSize: 'B',
        subscriptionActive: false,
        breed: 'Siamese',
      },
    ],
  },
  {
    id: 'user2',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@test.com',
    cats: [
      {
        name: 'Lionel',
        pouchSize: 'C',
        subscriptionActive: true,
        breed: 'Persian',
      },
      {
        name: 'Roman',
        pouchSize: 'B',
        subscriptionActive: true,
        breed: 'Siamese',
      },
      {
        name: 'Edinson',
        pouchSize: 'F',
        subscriptionActive: true,
        breed: 'Siamese',
      },
    ],
  },
];

jest.mock('../../data.json', () => mockUsers);

import { Test, TestingModule } from '@nestjs/testing';
import { CommsService } from './comms.service';
import { User } from 'src/common/types';

describe('CommsService', () => {
  let service: CommsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommsService],
    }).compile();

    service = module.get<CommsService>(CommsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find correct user by ID', () => {
    const user = service.findUserById('user1');
    expect(user?.firstName).toEqual('Julieta');
  });

  it('should format cat names grammatically correct', () => {
    const cats = service.formatCatNames(mockUsers[0].cats);
    expect(cats).toEqual('Ricky and Pip');
  });

  it('should calculate total price based on active subscirption and pouch size', () => {
    const price = service.calculateTotalPouchPrice(mockUsers[1].cats);
    expect(price).toEqual(193.5);
  });

  it('should return if a free gift is available', () => {
    const hasFreeGift = service.hasFreeGift(193.5);
    expect(hasFreeGift).toEqual(true);
  });

  it('should generate correct next delivery message', () => {
    const message = service.getNextDelivery('user1');

    expect(message).toEqual({
      title: `Your next delivery for Ricky and Pip`,
      message: `Hey Julieta! In two days' time, we'll be charging you for your next order for Ricky and Pip's fresh food.`,
      totalPrice: 55.5,
      freeGift: false,
    });
  });
});
