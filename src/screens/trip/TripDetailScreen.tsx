import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import HotelCard from '../../components/HotelCard';
import TransportCard from '../../components/TransportCard';

export default function TripDetailScreen({ route, navigation }: any) {
  const { plan } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {plan.days}-Day {plan.travelStyle} Trip
      </Text>
      <Text style={styles.subtitle}>Budget: PKR {plan.budget}</Text>

      <Text style={styles.sectionTitle}>Recommended Cities</Text>
      {plan.recommendedCities.map((city: string, index: number) => (
        <Text key={index} style={styles.city}>• {city}</Text>
      ))}

      <Text style={styles.sectionTitle}>Recommended Hotels</Text>
      {plan.hotels.length > 0 ? (
        plan.hotels.map((hotel: any) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))
      ) : (
        <Text>No hotels found for your criteria</Text>
      )}

      <Text style={styles.sectionTitle}>Transport Options</Text>
      {plan.transports.length > 0 ? (
        plan.transports.map((transport: any) => (
          <TransportCard key={transport._id} transport={transport} />
        ))
      ) : (
        <Text>No transport options found</Text>
      )}

      <Button
        title="Start Journey"
        onPress={() => navigation.navigate('StartJourney', { plan })}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
  subtitle: { fontSize: 16, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  city: { marginLeft: 16 },
});