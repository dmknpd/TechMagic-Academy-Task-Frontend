import { Tour } from './tour';

interface Address {
  country: string;
  city: string;
}

export interface Client {
  _id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  address: Address;
  email: string;
  phone: string;
  sellerId: string | Seller;
  createdAt: string;
  __v: number;
}

export interface ClientFormData {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  email: string;
  address: Address;
}

export interface Seller {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface ClientFullInfo extends Client {
  sellerId: Seller;
  tours: Tour[];
}
