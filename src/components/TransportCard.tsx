import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Transport } from '../models/transport';

interface TransportCardProps {
  transport: Transport;
}

export default function TransportCard({ transport }: TransportCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.type}>
        {transport.type.toUpperCase()} ({transport.tier})
      </Text>
      <Text style={styles.operator}>{transport.operator}</Text>
      <Text style={styles.details}>
        PKR {transport.price} • {transport.durationHours} hours
      </Text>
      <Text style={styles.schedule}>
        Schedule: {transport.schedule}
      </Text>
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
  type: { fontSize: 16, fontWeight: 'bold' },
  operator: { color: '#666', marginTop: 4 },
  details: { color: '#666', marginTop: 4 },
  schedule: { color: '#666', marginTop: 4, fontStyle: 'italic' },
});