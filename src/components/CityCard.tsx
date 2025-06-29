import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { City } from '../models/city';

interface CityCardProps {
  city: City;
}

export default function CityCard({ city }: CityCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{city.name}</Text>
      <Text style={styles.province}>{city.province}</Text>
      <Text style={styles.season}>Best Season: {city.bestSeason}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: 'bold' },
  province: { color: '#666' },
  season: { color: '#666', marginTop: 4 },
});