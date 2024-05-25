import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {Text, View} from 'react-native';
import {ActivityIndicator, Button} from 'react-native-paper';
import {getPokemons} from '../../../actions/pokemons';

const HomeScreen = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['pokemons'],
    queryFn: getPokemons,
    staleTime: 1000 * 60 * 60,
  });
  return (
    <View>
      <Text>HomeScreen</Text>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Button mode="contained" onPress={() => console.log('Pressed')}>
          Press me
        </Button>
      )}
    </View>
  );
};

export default HomeScreen;
