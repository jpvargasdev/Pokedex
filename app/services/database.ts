import { MMKVInstance, MMKVLoader } from "react-native-mmkv-storage";

export const STORAGE_KEY = 'FAVOURITES';

class Storage {
  storage: MMKVInstance | null = null;

  initialize() {
    this.storage = new MMKVLoader().initialize();
  }

  getStorage() {
    return this.storage;
  }

  addPokemon(id: number, value: string) {
    const list = this.storage?.getMap(STORAGE_KEY);
    const newList = Object.assign({}, list);
    newList[id] = value.toUpperCase();
    this.storage?.setMap(STORAGE_KEY, newList);
    return newList;
  }

  getAllPokemons( ){
    const pokemonObject = this.storage?.getMap(STORAGE_KEY);
    const keys = Object.keys(pokemonObject);
    const vals = Object.values(pokemonObject);
    const arr = keys.map((key, index) => ({id: key, name: vals[index]}));
    return arr
  }

}

const storage = new Storage();
storage.initialize();

export default storage

