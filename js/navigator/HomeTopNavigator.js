import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
import Ranking from '../pages/Ranking';
import LikePage from '../pages/LikePage';
import Recommend from '../pages/Recommend';

export default function HomeTopNavigator({navigatorChange}) {
  return (
    <Tab.Navigator lazy={true} tabBar={() => null}>
      <Tab.Screen
        name="Recommend"
        component={Recommend}
        options={{tabBarLabel: 'Recommend'}}
        listeners={({route}) => ({
          state: navigatorChange(route),
        })}
      />
      <Tab.Screen
        name="Ranking"
        component={Ranking}
        options={{tabBarLabel: 'Ranking'}}
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
