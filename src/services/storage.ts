import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../models/user';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const saveToken = async (token: string) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

export const saveUser = async (user: User) => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = async (): Promise<User | null> => {
  const userJson = await AsyncStorage.getItem(USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

export const clearAll = async () => {
  await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
};