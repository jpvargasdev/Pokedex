export const CONFIG = {
  API_URL: 'https://beta.pokeapi.co/graphql/v1beta',
  getImageUrl:
    (id: number): string => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
  MAX_POKEMON_COUNT: 649,
  MAX_POKEMON_PAGE_LIST: 20,
} as const;


