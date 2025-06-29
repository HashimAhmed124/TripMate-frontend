// themes.ts
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const LightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

export const DarkTheme = {
  ...MD3DarkTheme,
  dark: true,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#2980b9',
    accent: '#f39c12',
    background: '#2c3e50',
    surface: '#34495e',
    text: '#ecf0f1',
  },
};
