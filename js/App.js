import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './navigator/AppNavigator';
import store from './redux';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
