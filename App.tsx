import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import BookFormScreen from './src/screens/BookFormScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Minha Biblioteca' }} 
        />
        <Stack.Screen 
          name="BookForm" 
          component={BookFormScreen} 
          options={{ title: 'Gerenciar Livro' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}