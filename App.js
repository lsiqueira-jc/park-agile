import { NativeBaseProvider, StatusBar } from 'native-base';

import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { AuthContextProvider } from './src/context/AuthContext';
import { Routes } from './src/routes';
import { THEME } from './src/styles/theme';
export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NativeBaseProvider theme={THEME}>
      <NavigationContainer>
        <AuthContextProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />

          <Routes />
        </AuthContextProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
