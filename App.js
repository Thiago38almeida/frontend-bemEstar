import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/contexts/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RotasEspecialistas from './src/rotas';
import linking from './src/linking';
import HomeScreen from './src/components/home';
import { Platform } from 'react-native';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AgendamentoPsicologaNeolog from './src/screens/psicologa/achelog';
import AgendamentoPsicologaMatriz from './src/screens/psicologa/matriz';
import AgendamentoMassoNeolog from './src/screens/massoterapeuta/Neolog';
import AgendamentoMassoMatriz from './src/screens/massoterapeuta/matriz';
import Login from './src/screens/login';
import { Helmet } from 'react-helmet';

const Stack = createNativeStackNavigator();

function WebRoutes() {
  return (
    <BrowserRouter >
    <Helmet>
        <title>Bem Estar</title>
      </Helmet>
      <Routes >
        <Route path="/" id='Home'    element={<HomeScreen />} Component={HomeScreen} />
        <Route path='/psicologaGLP' element={<AgendamentoPsicologaNeolog />} />
        <Route path='/psicologaMatriz' element={<AgendamentoPsicologaMatriz />} />
        <Route path='/massoterapiaGLP' element={<AgendamentoMassoNeolog />} />
        <Route path='/massoterapiaMatriz' element={<AgendamentoMassoMatriz />} />
        <Route path='/Login' element={<Login />} />
        {/* Adicione mais rotas para outras telas */}
      </Routes>
    </BrowserRouter>
  );
}


function AppMobile() {
  return (
    <NavigationContainer linking={linking} 
    fallback={<Text>Carregando...</Text>}
   
    >
      <AuthProvider>
        <RotasEspecialistas />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default function App() {

  return (
    <NavigationContainer  documentTitle={
      Platform.OS === "web" ? "" : "Bem estar"
    }>
      <AuthProvider>
        <WebRoutes />

      </AuthProvider>

    </NavigationContainer>
  );

}
