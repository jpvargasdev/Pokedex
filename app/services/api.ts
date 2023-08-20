import { gql, GraphQLClient } from "graphql-request";
import { Pokemon, PokemonClient } from "pokenode-ts";
import { useInfiniteQuery, useQuery } from "react-query";
import { CONFIG } from "../config";

const api = new PokemonClient();


const graphQLClient = new GraphQLClient(CONFIG.API_URL);


const _getPokemonById = async (id: number): Promise<Pokemon> => {
  const pokemon: Pokemon = await api.getPokemonById(id);
  return pokemon;
}

export function useGetAllPokemons() {
  const _getAllPokemons = async ({ pageParam = 0 }) => {
    const mPage = pageParam * CONFIG.MAX_POKEMON_PAGE_LIST
    const { results } = await api.listPokemons(mPage, CONFIG.MAX_POKEMON_PAGE_LIST);
    return {
      data: results,
      nextPage: pageParam + 1
    };
  };

  return useInfiniteQuery(['getAllPokemons'], _getAllPokemons, {
    getNextPageParam: (lastPage) => lastPage.nextPage
  });
} 

export function useGetPokemonById(id: number) {
  return useQuery({
    queryKey: ['getPokemonById', id],
    queryFn: () => _getPokemonById(id)
  });
}

export async function useGetAllInfoPokemonById(id: number) {
  const data: Record<string, any> = await graphQLClient.request(gql`
    query samplePokeAPIquery {
      pokemon_v2_pokemon(where: {id: {_eq: ${id}}}) {
        id
        name
        pokemon_v2_pokemonspecy {
          pokemon_v2_evolutionchain {
            pokemon_v2_pokemonspecies {
              name
              order
              id
            }
          }
        }
        pokemon_v2_pokemonabilities {
          pokemon_v2_ability {
            name
          }
        }
        weight
        height
      }
    }
  `);


  const pokemon = data?.pokemon_v2_pokemon[0];

  const evs = pokemon?.pokemon_v2_pokemonspecy?.pokemon_v2_evolutionchain?.pokemon_v2_pokemonspecies;
  const evolutions = evs.sort((a, b) => {
    return a.order - b.order
  });

  return {
    name: pokemon.name.toUpperCase(),
    id: pokemon.id,
    height: pokemon?.height,
    weight: pokemon?.weight,
    evolutions,
    habilities: pokemon?.pokemon_v2_pokemonabilities?.map((h: Record<string, any>) => h.pokemon_v2_ability.name )
  }
}
 
