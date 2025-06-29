// screens/trip/TripPlannerScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

export default function TripPlannerScreen() {
  const navigation = useNavigation<any>();

  const [currentLocation, setCurrentLocation] = useState('Lahore');
  const [budget, setBudget] = useState('');
  const [days, setDays] = useState('');
  const [preferredCities, setPreferredCities] = useState('Karachi,Islamabad');
  const [accommodationTiers, setAccommodationTiers] = useState('mid,luxury');
  const [travelStyle, setTravelStyle] = useState('cultural');
  const [departureDate, setDepartureDate] = useState(new Date());

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleGenerateTrip = async () => {
    if (!budget || !days || !currentLocation || !travelStyle) {
      Alert.alert('Missing Fields', 'Please fill all required fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/trip/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentLocation,
          budget: parseFloat(budget),
          days: parseInt(days),
          preferredCities: preferredCities.split(',').map((c) => c.trim()),
          accommodationTiers: accommodationTiers.split(',').map((t) => t.trim()),
          travelStyle,
          departureDate
        })
      });

      const plan = await response.json();
      navigation.navigate('TripPlanScreen', { plan });
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Could not generate trip. Try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Plan Your Trip</Text>

      <TextInput
        style={styles.input}
        placeholder="Current City"
        value={currentLocation}
        onChangeText={setCurrentLocation}
      />

      <TextInput
        style={styles.input}
        placeholder="Total Budget (PKR)"
        keyboardType="numeric"
        value={budget}
        onChangeText={setBudget}
      />

      <TextInput
        style={styles.input}
        placeholder="Number of Days"
        keyboardType="numeric"
        value={days}
        onChangeText={setDays}
      />

      <TextInput
        style={styles.input}
        placeholder="Preferred Cities (comma-separated)"
        value={preferredCities}
        onChangeText={setPreferredCities}
      />

      <TextInput
        style={styles.input}
        placeholder="Accommodation Tiers (comma-separated)"
        value={accommodationTiers}
        onChangeText={setAccommodationTiers}
      />

      <TextInput
        style={styles.input}
        placeholder="Travel Style (e.g. cultural, adventure)"
        value={travelStyle}
        onChangeText={setTravelStyle}
      />

      <View style={styles.datePickerWrapper}>
        <Button title="Select Departure Date" onPress={() => setShowDatePicker(true)} />
        <Text style={styles.dateLabel}>
          {departureDate.toDateString()}
        </Text>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={departureDate}
          mode="date"
          display="default"
          onChange={(_, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDepartureDate(selectedDate);
          }}
        />
      )}

      <Button title="Generate Trip Plan" onPress={handleGenerateTrip} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12
  },
  datePickerWrapper: {
    marginBottom: 16
  },
  dateLabel: {
    marginTop: 8,
    fontSize: 16,
    color: '#555'
  }
});
