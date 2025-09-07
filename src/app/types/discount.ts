export interface Discount {
  _id: string;
  name: string;
  value: number;
  description: string;
  createdAt: string;
  __v: number;
}

export interface DiscountFormData {
  name: string;
  value: number;
  description: string;
}
