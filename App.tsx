import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './app/Navigator/RootNavigator/RootNavigator';
import { Provider } from 'react-redux';
import store from './app/Redux/Store';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './app/Redux/Store/store';
import { adaptNavigationTheme, PaperProvider } from 'react-native-paper';
import { DarkThemeSchemes, LightThemeSchemes } from './ColorSchemes';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const queryClient = new QueryClient();
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <PaperProvider
            theme={isDarkMode ? DarkThemeSchemes : LightThemeSchemes}
          >
            <NavigationContainer theme={isDarkMode ? DarkTheme : LightTheme}>
              <SafeAreaProvider>
                <StatusBar
                  barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                />
                <RootNavigator />
              </SafeAreaProvider>
            </NavigationContainer>
          </PaperProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
