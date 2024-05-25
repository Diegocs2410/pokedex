import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import type {Pokemon} from '../../../../domain/entities/pokemon';

interface Props {
  pokemon: Pokemon;
}

const PokemonCard = ({pokemon}: Props) => {
  return (
    <Card style={[styles.cardContainer]}>
      <Text style={styles.name} variant="bodyLarge" lineBreakMode="middle">
        {pokemon.name}
        {'\n#' + pokemon.id}
      </Text>
      {/* PokeBall background image */}
      <View style={styles.pokeballContainer}>
        <Image
          style={styles.pokeball}
          source={require('../../../../assets/pokeball-light.png')}
        />
      </View>
      <Image source={{uri: pokemon.avatar}} style={styles.pokemonImage} />
      <Text style={[styles.name, {marginTop: 20}]}>{pokemon.types[0]}</Text>
    </Card>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: 'grey',
    height: 120,
    flex: 0.5,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    color: 'white',
    top: 10,
    left: 10,
  },
  pokeball: {
    width: 100,
    height: 100,
    right: -25,
    top: -25,
    opacity: 0.4,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -15,
    top: -30,
  },

  pokeballContainer: {
    alignItems: 'flex-end',
    width: '100%',
    position: 'absolute',

    overflow: 'hidden',
    opacity: 0.5,
  },
});
export default PokemonCard;
