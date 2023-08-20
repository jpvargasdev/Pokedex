import React from 'react';
import {Text, TextStyle, ViewStyle, View, ScrollView} from 'react-native';
import { SvgUri } from 'react-native-svg';
import {Screen} from '../components/core/screen';
import { CONFIG } from '../config';
import { useGetAllInfoPokemonById } from '../services/api';
import storage from '../services/database';
import { colors } from '../theme';
import {Button} from '../components/base/button'


const $title: TextStyle = {
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 20,
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.background,
  padding: 8,
}

const $subtitle: TextStyle = {
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'left',
  marginVertical: 5,
}

const $favoriteButton: ViewStyle = {
  backgroundColor: colors.palette.gold_foil,
  justifyContent: 'center',
  alignItems: 'center'
};

const $buttonText: TextStyle = {
  color: colors.palette.white,
  fontWeight: 'bold',
  fontSize: 16,
  textAlign: 'center',
  margin: 8,
};

const $buttonContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
}

export function PokemonDetails({route, navigation}: any) {
  const {id} = route.params;

  const [data, setData] = React.useState<Record<string, any>>({});


  React.useEffect(() => {
    async function getData() {
      const data = await useGetAllInfoPokemonById(id);
      setData(data);
    }
    getData();
  }, [])

  const addPokemonToFavourite = React.useCallback(() => {
    if (data?.name) {
      storage.addPokemon(id, data?.name);
      navigation.goBack();
    }
    return;
  }, [id, data]);


  return (
    <Screen style={$container}>
      <ScrollView>
        <View style={$buttonContainer}>
          <Text style={$title}>{data.name}</Text>

          <Button
            title='FAVOURITES'
            buttonStyle={$favoriteButton}
            textStyle={$buttonText}
            onPress={addPokemonToFavourite}
          />
        </View>

        <View>
          <SvgUri uri={CONFIG.getImageUrl(id)} height={100} width={100} />
          <Text style={$subtitle}>Stats:</Text>
          <View>
            <Text>Height: {data.height}</Text>
            <Text>Weight: {data.weight}</Text>
          </View>
        </View>
        <View>
          <Text style={$subtitle}>Evolutions:</Text>
          {data?.evolutions?.map((ev: Record<string, any>, index: number) => (
            <View key={index}>
              <Text>{ev.name}</Text>
              <SvgUri uri={CONFIG.getImageUrl(ev.id)} height={100} width={100} />
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}


