import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Index from '../index'; // Sua tela Home
import About from '../about';

export type StackParamList = {
  index: undefined;
  about: undefined;
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Index} />
        <Stack.Screen name="about" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;