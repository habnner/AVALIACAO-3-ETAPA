import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import BookFormScreen from './src/screens/BookFormScreen';
import BookDetailScreen from './src/screens/BookDetailScreen';
import { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Minha Biblioteca' }} />
        <Stack.Screen name="BookForm" component={BookFormScreen} options={{ title: 'Gerenciar Livro' }} />
        <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ title: 'Detalhes do Livro' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
