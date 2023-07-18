import * as React from 'react';
import { BaseRouter, NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/contexts/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RotasEspecialistas from './src/rotas';
import linking from './src/linking';
const Stack = createNativeStackNavigator()




export default function App() {
  return (
    <NavigationContainer linking={linking} fallback={<Text>Carregendo......</Text>} >
      

        <AuthProvider>
          <RotasEspecialistas/>
        </AuthProvider>
    </NavigationContainer>
  );
}

