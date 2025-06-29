import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../providers/AuthProvider';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{user.name}</Text>
        
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>
        
        {user.phone && (
          <>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{user.phone}</Text>
          </>
        )}
      </View>

      <View style={styles.preferences}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        {user.preferences.budgetRange && (
          <>
            <Text style={styles.label}>Budget Range:</Text>
            <Text style={styles.value}>
              PKR {user.preferences.budgetRange.min} - {user.preferences.budgetRange.max}
            </Text>
          </>
        )}
        {user.preferences.travelStyle && (
          <>
            <Text style={styles.label}>Travel Style:</Text>
            <Text style={styles.value}>{user.preferences.travelStyle}</Text>
          </>
        )}
      </View>

      <Button title="Logout" onPress={logout} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  infoContainer: { marginBottom: 24 },
  preferences: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  label: { fontWeight: 'bold', marginTop: 8 },
  value: { marginBottom: 8 },
});