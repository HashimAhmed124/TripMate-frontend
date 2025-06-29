// screens/trip/TripPlanScreen.tsx
import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import TripDayCard from '../../components/TripDayCard';
import { TripPlan } from '../../models/trip';

interface Props {
  route: {
    params: {
      plan: TripPlan;
    };
  };
}

export default function TripPlanScreen({ route }: Props) {
  const { plan } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your {plan.summary.travelDays}-Day Trip Plan</Text>
      <Text style={styles.subtitle}>
        Visiting {plan.summary.citiesVisited.join(', ')}
      </Text>
      
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Trip Summary</Text>
        <Text>Total Cost: PKR {plan.summary.totalCost.toLocaleString()}</Text>
        <Text>Accommodation: {plan.summary.hotelTiers.join('/')} tier</Text>
        <Text>Transport: {plan.summary.transportTypes.join(', ')}</Text>
      </View>
      
      {plan.itinerary.map((day, index) => {
  const dayNumber = typeof day.day === 'number' ? day.day : index + 1;

  if (day.type === 'transport') {
    return (
      <TripDayCard
        key={index}
        day={dayNumber}
        type="transport"
        data={day.data}  // ✅ this is only valid for transport
      />
    );
  }

  return (
    <TripDayCard
      key={index}
      day={dayNumber}
      type="city"
      data={day}  // ✅ for city, we pass the whole object
    />
  );
})}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20
  },
  summaryCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee'
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#444'
  }
});