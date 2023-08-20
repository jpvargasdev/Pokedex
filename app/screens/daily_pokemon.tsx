import React from 'react';
import {ActivityIndicator, ImageStyle, Text, TextStyle, View} from 'react-native';
import { SvgUri } from 'react-native-svg';
import { ViewStyle } from 'react-native/types';
import {Screen} from '../components/core/screen';
import { CONFIG } from '../config';
import { useGetPokemonById } from '../services/api';
import { colors } from '../theme';
import {Button} from '../components/base/button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigators';
import storage from '../services/database';

const $container: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
};

const $welcome: TextStyle = {
  textAlign: 'center',
  fontSize: 30,
  fontWeight: 'bold',
  color: colors.palette.text,
  marginBottom: 20,
};

const $title: TextStyle = {
  fontSize: 24,
  fontWeight: "bold",
  color: colors.palette.text
};

const $svg: ImageStyle = {
  flex: 1,
  margin: 10,
  maxWidth: '90%'
}

const $containerSpinner: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

const $containerButtons: ViewStyle = {
  flexDirection: 'row',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
};

const $continueButton: ViewStyle = {
  backgroundColor: colors.palette.cerulean_blue,
  padding: 10,
  flex: 1,
};

const $statsButton: ViewStyle = {
  backgroundColor: colors.palette.boston_red,
  padding: 10,
  flex: 1,
};


const $continueButtonText: TextStyle = {
  color: colors.palette.white,
  fontWeight: 'bold',
  fontSize: 16,
  textAlign: 'center'
};

const $refetchButton: ViewStyle = {
  backgroundColor: colors.palette.red,
  padding: 8,
  borderRadius: 4
};

const $textRefetch: TextStyle = {
  color: colors.palette.white,
}

type IProps = NativeStackScreenProps<AppStackParamList, 'daily_pokemon'>;

const _getRandomId = () => Math.floor(Math.random() * (1 * CONFIG.MAX_POKEMON_COUNT) + 1);

export function DailyPokemon({ navigation }: IProps) {

  const [id, setId] = React.useState(() => _getRandomId())
  const {data} = useGetPokemonById(id);

  const navigateToMainView = React.useCallback(() => {
    navigation.navigate('main');
  }, []);

   const navigateToStats = React.useCallback(() => {
    navigation.navigate('pokemon_details', {id});
  }, [id]);

  const refetchPokemon = React.useCallback(() => {
    setId(_getRandomId()) 
  }, []) 

  if (data?.id) {
    return (
      <Screen contentContainerStyle={$container}>
        <Text style={$welcome}>Your daily pokemon!</Text>
        <Text style={$title}>{data?.name.toUpperCase()}</Text>
        <Button
          title='SWITCH'
          buttonStyle={$refetchButton}
          textStyle={$textRefetch}
          onPress={refetchPokemon}
        />


        <SvgUri uri={CONFIG.getImageUrl(data?.id)} style={$svg} />

          <View style={$containerButtons}>
          <Button
            title='STATS'
            buttonStyle={$statsButton}
            textStyle={$continueButtonText}
            onPress={navigateToStats}
          />
          <Button
            title='CONTINUE'
            buttonStyle={$continueButton}
            textStyle={$continueButtonText}
            onPress={navigateToMainView}
          />
        </View>
      </Screen>
    );
  }

  return (
    <View style={$containerSpinner}>
      <ActivityIndicator size='large'/>
    </View>
  )
}
