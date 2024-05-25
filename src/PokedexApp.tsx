import React from 'react';
import 'react-native-gesture-handler';
import {ThemeContextProvider} from './presentation/screens/context/themeContext';
import StackNavigator from './presentation/screens/navigator/StackNavigator';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

const PokedexApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <StackNavigator />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
};

export default PokedexApp;
