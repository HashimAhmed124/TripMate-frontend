// components/TripDayCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CityCard from './CityCard';
import HotelCard from './HotelCard';
import TransportCard from './TransportCard';

interface TripDayCardProps {
  day: string | number;
  type: 'city' | 'transport';
  data: any;
}

export default function TripDayCard({ day, type, data }: TripDayCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.dayHeader}>Day {day}</Text>
      
      {type === 'city' ? (
        <>
          <CityCard city={data.city} />
          <Text style={styles.sectionHeader}>Your Stay:</Text>
          <HotelCard hotel={data.hotel} />
          
          <Text style={styles.sectionHeader}>Recommended Attractions:</Text>
          {data.attractions.map((att: string, i: number) => (
            <Text key={i} style={styles.attraction}>• {att}</Text>
          ))}
        </>
      ) : (
        <>
          <Text style={styles.travelHeader}>Travel to {data.toCity}</Text>
          <TransportCard transport={data} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  dayHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
    color: '#444'
  },
  attraction: {
    marginLeft: 8,
    marginBottom: 4,
    color: '#666'
  },
  travelHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#444'
  }
});