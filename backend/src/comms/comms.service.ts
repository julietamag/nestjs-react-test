import users from '../../data.json';
import { Injectable, NotFoundException } from '@nestjs/common';
import { pouchPrices, pouchSizes } from '../common/constants';
import { Cat, NextDelivery, Pouch, User } from '../common/types';

function isPouch(value: any): value is Pouch {
  return Object.keys(pouchSizes).includes(value);
}

@Injectable()
export class CommsService {
  private readonly usersData: User[] = users.map((user) => ({
    ...user,
    cats: user.cats.map((cat) => ({
      ...cat,
      pouchSize: isPouch(cat.pouchSize) ? cat.pouchSize : 'A',
    })),
  }));

  findUserById(id: string): User | null {
    return this.usersData.find((user) => user.id === id) || null;
  }

  formatCatNames(cats: Cat[]): string {
    const catNames = cats.map((cat) => cat.name);

    if (catNames.length < 3) {
      return catNames.join(' and ');
    }

    const lastName = catNames.pop();
    return catNames.join(', ').concat(` and ${lastName}`);
  }

  calculateTotalPouchPrice(cats: Cat[]): number {
    let totalPrice = 0;
    for (const { pouchSize, subscriptionActive } of cats) {
      if (subscriptionActive) {
        totalPrice += pouchPrices[pouchSize];
      }
    }
    return totalPrice;
  }

  hasFreeGift(totalPrice: number): boolean {
    return totalPrice > 120;
  }

  getNextDelivery(id: string): NextDelivery {
    const user = this.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const catNames = this.formatCatNames(user.cats);
    const totalPrice = this.calculateTotalPouchPrice(user.cats);
    const hasFreeGift = this.hasFreeGift(totalPrice);

    return {
      title: `Your next delivery for ${catNames}`,
      message: `Hey ${user.firstName}! In two days' time, we'll be charging you for your next order for ${catNames}'s fresh food.`,
      totalPrice,
      freeGift: hasFreeGift,
    };
  }
}
