import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {FlatList, StyleSheet, View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getPokemons} from '../../../actions/pokemons';
import {globalTheme} from '../../../config/theme/global-theme';
import PokemonCard from '../components/pokemons/PokemonCard';
import PokeballBG from '../components/ui/PokeballBG';

const HomeScreen = () => {
  const queryClient = useQueryClient();
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
    staleTime: 1000 * 60 * 60,
    queryFn: async params => {
      const pokemons = await getPokemons(params.pageParam);
      pokemons.forEach(pokemon => {
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
      });
      return pokemons;
    },
    getNextPageParam: (lastPage, allPages) => allPages.length,
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
