import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
import ClassicPage from '../pages/ClassicPage';
import BookPage from '../pages/BookPage';
import LikePage from '../pages/LikePage';

export default function HomeTopNavigator({navigatorChange}) {
  return (
    <Tab.Navigator lazy={true} tabBar={() => null}>
      <Tab.Screen
        name="ClassicPage"
        component={ClassicPage}
        options={{tabBarLabel: 'ClassicPage'}}
        listeners={({route}) => ({
          state: navigatorChange(route),
        })}
      />
      <Tab.Screen
        name="BookPage"
        component={BookPage}
        options={{tabBarLabel: 'BookPage'}}
        listeners={({route}) => ({
          state: navigatorChange(route),
        })}
      />
      <Tab.Screen
        name="LikePage"
        component={LikePage}
        options={{tabBarLabel: 'LikePage'}}
        listeners={({route}) => ({
          state: navigatorChange(route),
        })}
      />
    </Tab.Navigator>
  );
}
