import React, { createContext, useState, useContext } from 'react';
import { City } from '../models/city';
import { Hotel } from '../models/hotel';
import { Transport } from "../models/transport";
import * as api from '../services/api';

interface TripContextType {
  cities: City[];
  hotels: Hotel[];
  transports: Transport[];
  isLoading: boolean;
  error: string | null;
  fetchCities: () => Promise<void>;
  fetchHotels: (city: string) => Promise<void>;
  fetchTransport: (fromCity: string, toCity: string) => Promise<void>;
  generateRecommendations: (params: {
    budget: number;
    days: number;
    travelStyle: string;
    province?: string;
  }) => Promise<any>;
}

const TripContext = createContext<TripContextType>(null!);

export const TripProvider = ({ children }: { children: React.ReactNode }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [transports, setTransports] = useState<Transport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCities = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.get('/cities');
      setCities(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cities');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHotels = async (city: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.get(`/hotels?city=${city}`);
      setHotels(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch hotels');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTransport = async (fromCity: string, toCity: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.get(`/transport?fromCity=${fromCity}&toCity=${toCity}`);
      setTransports(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transport');
    } finally {
      setIsLoading(false);
    }
  };

  const generateRecommendations = async (params: {
    budget: number;
    days: number;
    travelStyle: string;
    province?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      // In a real app, this would call your ML backend API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      // Mock recommendations
      return {
        budget: params.budget,
        days: params.days,
        travelStyle: params.travelStyle,
        recommendedCities: cities.filter(c => 
          params.province ? c.province === params.province : true
        ).slice(0, 2).map(c => c.name),
        hotels: hotels.filter(h => h.pricePerNight <= params.budget / params.days),
        transports: transports.filter(t => t.price <= params.budget / 3),
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate recommendations');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TripContext.Provider value={{
      cities,
      hotels,
      transports,
      isLoading,
      error,
      fetchCities,
      fetchHotels,
      fetchTransport,
      generateRecommendations,
    }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => useContext(TripContext);