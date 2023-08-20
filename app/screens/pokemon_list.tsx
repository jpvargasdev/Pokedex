import React from 'react';
import {Screen} from '../components/core/screen';
import {FlatList, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import { useGetAllPokemons } from '../services/api';
import { SvgUri } from 'react-native-svg';
import { CONFIG } from '../config';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigators';

const $pokemonItemContainer: ViewStyle = {
  width: '100%',
  height: 80,
  justifyContent: 'space-around',
  alignItems: 'center',
  flexDirection: 'row',
  borderBottomWidth: StyleSheet.hairlineWidth,
};

type IProps = NativeStackScreenProps<AppStackParamList, 'daily_pokemon'>;

export function PokemonList({navigation}: IProps) {
  const {data, fetchNextPage, isLoading} = useGetAllPokemons();
  const flattenData = data?.pages.flatMap((page) => page.data);
  
  const onPokemonClick = React.useCallback((id: number) => {
    navigation.navigate('pokemon_details', { id: id })
  }, []);

  return (
    <Screen>
      <FlatList
        data={flattenData}
        keyExtractor={(_, index) => index}
        renderItem={({index, item}) => {
          return (
          <TouchableOpacity style={$pokemonItemContainer} onPress={() => onPokemonClick(index+1)}>
            <SvgUri uri={CONFIG.getImageUrl(index + 1)} height={60} width={60}/>
            <Text>{item.name.toUpperCase()}</Text>
          </TouchableOpacity>
          );
        }}
        onEndReachedThreshold={0.2}
        onEndReached={fetchNextPage}
        refreshing={isLoading}
      />
    </Screen>
  );
}


