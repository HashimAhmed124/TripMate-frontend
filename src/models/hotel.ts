export interface Hotel {
  _id: string;
  name: string;
  city: string;
  province: string;
  address: string;
  tier: string;
  pricePerNight: number;
  amenities: string[];
  rating: number;
  contact: string;
  images: string[];
}