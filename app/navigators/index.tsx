import React from 'react';
import {useColorScheme} from 'react-native';

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import * as Screens from '../screens';

import {colors} from '../theme';

export type AppStackParamList = {
  daily_pokemon: undefined,
  main: undefined,
  pokemon_details: { id: number },
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

const Stack = createNativeStackNavigator<AppStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabsStack() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="pokemon_list" component={Screens.PokemonList} options={{title: 'LIST'}}/>
      <Tab.Screen name="pokemon_bookmarks" component={Screens.PokemonBookmarks} options={{title: 'FAVOURITES'}}/>
    </Tab.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        navigationBarColor: colors.palette.background,
      }}>
      <Stack.Screen name="daily_pokemon" component={Screens.DailyPokemon} options={{headerShown: false}}/>
      <Stack.Screen name="main" component={MainTabsStack} />
      <Stack.Screen name="pokemon_details" component={Screens.PokemonDetails} options={{headerTitle: 'Details'}}/>

    </Stack.Navigator>
  );
}

function AppNavigator() {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AppStack />
    </NavigationContainer>
  );
}

export default AppNavigator;
