import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../home/HomeScreen';
import PokemonScreen from '../pokemon/PokemonScreen';
import SearchScreen from '../search/SearchScreen';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  PokemonScreen: {pokemonId: number};
  SearchScreen: undefined;
};

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
