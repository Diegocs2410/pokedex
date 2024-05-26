import {pokeApi} from './../../config/api/pokeApi';
import type {
  PokeAPIPaginatedResponse,
  PokeAPIPokemon,
} from '../../infrastructure/interfaces/pokeApi.interfaces';
import {PokemonMapper} from '../../infrastructure/mappers/pokemon.mapper';

export const getPokemons = async (page: number, limit = 20) => {
  try {
    const url = `/pokemon?offset=${page * 10}&limit=%${limit}`;
    const {data} = await pokeApi.get<PokeAPIPaginatedResponse>(url);

    const pokemonAPIPromises = data.results.map(info => {
      return pokeApi.get<PokeAPIPokemon>(info.url);
    });

    const pokeApiPokemons = await Promise.all(pokemonAPIPromises);
    const pokemonsPromises = pokeApiPokemons.map(p =>
      PokemonMapper.pokemonToEntity(p.data),
    );

    return Promise.all(pokemonsPromises);
  } catch (error) {
    console.log(error);
    throw new Error('Error getting pokemons');
  }
};
