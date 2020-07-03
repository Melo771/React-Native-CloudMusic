import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcons from 'react-native-vector-icons/Entypo';

import MoviePage from '../pages/MoviePage';
import BookPage from '../pages/BookPage';
import LikePage from '../pages/LikePage';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="MoviePage"
      tabBarOptions={{
        activeTintColor: '#000',
      }}>
      <Tab.Screen
        name="MoviePage"
        component={MoviePage}
        options={{
          tabBarLabel: '电影',
          tabBarIcon: ({color, size}) => (
            <EntypoIcons name="circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="BookPage"
        component={BookPage}
        options={{
          tabBarLabel: '书籍',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="triangle-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="LikePage"
        component={LikePage}
        options={{
          tabBarLabel: '喜欢',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="square-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
