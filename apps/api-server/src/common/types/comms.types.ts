import { pouchSizes } from '../constants';

export interface Cat {
  name: string;
  subscriptionActive: boolean;
  breed: string;
  pouchSize: Pouch;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cats: Cat[];
}

export interface NextDelivery {
  title: string;
  message: string;
  totalPrice: number;
  freeGift: boolean;
}

export type Pouch = keyof typeof pouchSizes;
