// models/trip.ts

import { City } from './city';
import { Hotel } from './hotel';
import { Transport } from './transport';

export interface TripDayCity {
  type: 'city';
  day: string;
  city: City;
  hotel: Hotel;
  attractions: string[];
}

export interface TripDayTransport {
  type: 'transport';
  day: number;
  data: Transport;
}

export type TripDay = TripDayCity | TripDayTransport;

export interface TripPlan {
  itinerary: TripDay[];
  summary: {
    totalCost: number;
    citiesVisited: string[];
    travelDays: number;
    hotelTiers: string[];
    transportTypes: string[];
  };
}
