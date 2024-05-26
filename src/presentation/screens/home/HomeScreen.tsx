import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {getPokemons} from '../../../actions/pokemons';
import PokeballBG from '../components/ui/PokeballBG';
import {ActivityIndicator, Text} from 'react-native-paper';
import {globalTheme} from '../../../config/theme/global-theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PokemonCard from '../components/pokemons/PokemonCard';

const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  // Traditional Request
  // const {data: pokemons = [], isLoading} = useQuery({
  //   queryKey: ['pokemons'],
  //   queryFn: () => getPokemons(0),
  //   staleTime: 1000 * 60 * 60,
  // });
  const {data, isLoading, fetchNextPage} = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    queryFn: params => getPokemons(params.pageParam),
    getNextPageParam: (lastPage, allPages) => allPages.length,
    staleTime: 1000 * 60 * 60,
  });

  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBG style={styles.imgPosition} />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          onEndReachedThreshold={0.6}
          onEndReached={() => fetchNextPage()}
          data={data?.pages.flat() || []}
          keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          style={{
            paddingTop: top + 20,
          }}
          renderItem={({item: pokemon}) => <PokemonCard pokemon={pokemon} />}
          ListHeaderComponent={() => (
            <Text variant="displayMedium">PokeDex</Text>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
});

export default HomeScreen;
