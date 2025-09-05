export interface Tour {
  _id: string;
  itineraryId: string;
  clientId: string;
  startDate: Date;
  duration: number;
  quantity: number;
  discount: number;
  createdAt: Date;
  __v: number;
}

export interface TourInfoFormData {
  startDate: Date;
  duration: number;
  quantity: number;
  discount?: number;
}
