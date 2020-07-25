import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomePage from '../pages/HomePage';
import PlayList from '../pages/PlayList';
import SingerDetail from '../pages/SingerDetail';
import Player from '../pages/Player/Player';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Home'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="PlayList" component={PlayList} />
        <Stack.Screen name="SingerDetail" component={SingerDetail} />
        <Stack.Screen name="Player" component={Player} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
