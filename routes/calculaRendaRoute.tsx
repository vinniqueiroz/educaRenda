import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Index from '../index';
import CalculaRenda from '../calculaRenda';

export type StackParamList = {
  index: undefined;
  calculaRenda: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="index">
        <Stack.Screen name="index" component={Index} />
        <Stack.Screen name="calculaRenda" component={CalculaRenda} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
