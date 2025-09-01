export interface Itinerary {
  _id: string;
  country: string;
  climate: string;
  duration: number;
  hotel: string;
  price: number;
  createdAt: string;
  __v: number;
}

export interface ItineraryFormData {
  country: string;
  climate: string;
  duration: number;
  hotel: string;
  price: number;
}
