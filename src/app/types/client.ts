interface Address {
  country: string;
  city: string;
  street: string;
}

export interface Client {
  _id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  address: Address;
  email: string;
  phone: string;
  sellerId: string;
  createdAt: string;
  __v: number;
}
