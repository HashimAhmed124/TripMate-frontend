export interface Transport {
  _id: string;
  type: string;
  tier: string;
  fromCity: string;
  toCity: string;
  price: number;
  durationHours: number;
  operator: string;
  schedule: string;
}