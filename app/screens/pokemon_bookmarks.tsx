import React from 'react';
import {Screen} from '../components/core/screen';
import {FlatList, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import { useGetAllPokemons } from '../services/api';
import { SvgUri } from 'react-native-svg';
import { CONFIG } from '../config';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigators';
import storage from '../services/database';

const $pokemonItemContainer: ViewStyle = {
  width: '100%',
  height: 80,
  justifyContent: 'space-around',
  alignItems: 'center',
  flexDirection: 'row',
  borderBottomWidth: StyleSheet.hairlineWidth,
};

type IProps = NativeStackScreenProps<AppStackParamList, 'daily_pokemon'>;

export function PokemonBookmarks({navigation}: IProps) {

  const [data, setData] = React.useState<Record<string, any>[]>([]);

  React.useEffect(() => {
    const data = storage.getAllPokemons();
    setData(data);
  }, []);

  
  const onPokemonClick = React.useCallback((id: number) => {
    navigation.navigate('pokemon_details', { id: id })
  }, []);

  return (
    <Screen>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index}
        renderItem={({item}) => {
          return (
          <TouchableOpacity style={$pokemonItemContainer} onPress={() => onPokemonClick(item.id)}>
            <SvgUri uri={CONFIG.getImageUrl(item.id)} height={60} width={60} />
            
            <Text>{item.name.toUpperCase()}</Text>
          </TouchableOpacity>
          );
        }}
      />
    </Screen>
  );
}


