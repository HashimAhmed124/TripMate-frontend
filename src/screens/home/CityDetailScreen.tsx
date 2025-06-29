import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useTrip } from '../../providers/TripProvider';
import HotelCard from '../../components/HotelCard';

export default function CityDetailScreen({ route, navigation }: any) {
  const { city } = route.params;
  const { hotels, isLoading, error, fetchHotels } = useTrip();

  useEffect(() => {
    fetchHotels(city.name);
  }, [city]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{city.name}, {city.province}</Text>
      <Text style={styles.subtitle}>Best Season: {city.bestSeason}</Text>
      
      <Text style={styles.sectionTitle}>Attractions:</Text>
      {city.attractions.map((attraction, index) => (
        <Text key={index} style={styles.attraction}>• {attraction}</Text>
      ))}

      <Text style={styles.sectionTitle}>Hotels:</Text>
      {isLoading && hotels.length === 0 ? (
        <ActivityIndicator />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={hotels}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <HotelCard hotel={item} />}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 16, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 16 },
  attraction: { marginLeft: 16 },
  error: { color: 'red' },
  list: { paddingVertical: 8 },
});