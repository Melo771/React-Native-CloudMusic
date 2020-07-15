import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
import Ranking from '../pages/Ranking';
import Recommend from '../pages/Recommend';
import Singer from '../pages/Singer';

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
        name="Singer"
        component={Singer}
        options={{tabBarLabel: 'Singer'}}
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
    </Tab.Navigator>
  );
}
