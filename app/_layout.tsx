import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import PSPDFKitDemo from './(tabs)/index';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const Stack = createStackNavigator();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={PSPDFKitDemo} options={{ headerShown: false }} />
      </Stack.Navigator>
    </ThemeProvider>
  );
}
