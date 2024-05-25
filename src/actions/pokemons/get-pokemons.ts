import {pokeApi} from '../../config/api/pokeApi';

export const getPokemons = async () => {
  try {
    const url = '/pokemon';
    const {data} = await pokeApi.get(url);
    console.log({data});
    return [];
  } catch (error) {
    throw new Error('Error getting pokemons');
  }
};
