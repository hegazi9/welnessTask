import React from 'react';
import RootNavigator from './src/navigation/rootnavigator';
import Colors from './src/utils/colors';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <>
      <RootNavigator />
      <StatusBar backgroundColor={Colors.black} barStyle="light-content" />
    </>
  );
};

export default App;
