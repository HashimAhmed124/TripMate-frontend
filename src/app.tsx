// App.tsx
import 'react-native-gesture-handler';
import React from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context'; 

import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './providers/AuthProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { TripProvider } from './providers/TripProvider';

import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import HomeScreen from './screens/home/HomeScreen';
import CityDetailScreen from './screens/home/CityDetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import TripPlannerScreen from './screens/trip/TripPlannerScreen';
import TripDetailScreen from './screens/trip/TripDetailScreen';
import StartJourneyScreen from './screens/trip/StartJourneyScreen'

import {LightTheme} from './utils/theme'; // ✅ Adjusted import

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  CityDetail: { cityId: string } | undefined;
  Profile: undefined;
  TripPlanner: undefined;
  TripDetail: { tripId: string } | undefined;
};

// Create typed navigator without needing an 'id'
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <TripProvider>
            <PaperProvider theme={LightTheme}>
              <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Register" component={RegisterScreen} />
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="CityDetail" component={CityDetailScreen} />
                  <Stack.Screen name="Profile" component={ProfileScreen} />
                  <Stack.Screen name="TripPlanner" component={TripPlannerScreen} />
                  <Stack.Screen name="TripDetail" component={TripDetailScreen} />
                  <Stack.Screen name="StartJourney" component={StartJourneyScreen} />
                </Stack.Navigator>
              </NavigationContainer>
            </PaperProvider>
          </TripProvider>
        </AuthProvider>
      </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
