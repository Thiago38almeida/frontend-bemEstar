import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './components/home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AgendamentoPsicologaMatriz from './screens/psicologa/matriz';
import TelaPsicologa from './screensUsers/psicologa/psicologa';
import Telahistorico from './screensUsers/psicologa/historico';
import AtendimentoEspecialista from './screensUsers/psicologa/GerenciamentoAtendimento';
import Login from './screens/login'
import FormsAgendamento from './components/FormsAgendamento';
import RotasPrivadas from './screens/rotasPrivadas';
import AgendamentoPsicologaNeolog from './screens/psicologa/achelog';
import AgendamentoMassoMatriz from './screens/massoterapeuta/matriz';
import AgendamentoMassoNeolog from './screens/massoterapeuta/Neolog';
import Reagendamentos from './screens/reagendamento';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


export default function RotasAgendamentos() {
  return (

   
   
      <Stack.Navigator initialRouteName='Home'>            

            {/* Telas dos Agendamentos Home*/}
            <Stack.Screen options={{ headerShown: false }} name="Home" navigationKey='/Home' key={'/Home'}  component={HomeScreen} />

              {/* Telas dos Agendamentos Psicologa*/}
            <Stack.Screen options={{ headerShown: false }} name="psicologaMatriz" navigationKey='/PsicologaMatriz' key={'/PsicologaMatriz'} component={AgendamentoPsicologaMatriz} />
            <Stack.Screen options={{ headerShown: false }} name="psicologaGLP" navigationKey='/PsicologaGLP' key={'/PsicologaGLP'} component={AgendamentoPsicologaNeolog} />

              {/* Telas dos Agendamentos Massoterapeuta*/}

            <Stack.Screen options={{ headerShown: false }} name="massoterapiaMatrix" navigationKey='/MatrixScreen' key={'/MatrixScreen'} component={AgendamentoMassoMatriz} />
            <Stack.Screen options={{ headerShown: false }} name="massoterapiaGLP" navigationKey='/MatrixScreen' key={'/MatrixScreen'} component={AgendamentoMassoNeolog} />

              {/* Telas dos Formulario de Agendamentos*/}
            <Stack.Screen options={{ headerShown: false }} name="formsAgendamento" navigationKey='/formsAgendamento' key={'/formsAgendamento'} component={FormsAgendamento} />
            <Stack.Screen options={{ headerShown: false }} name="Reagendamento" navigationKey='/Reagendamento' key={'/Reagendamento'} component={Reagendamentos} />

              {/* Rotas Privadas*/}
            <Stack.Screen options={{ headerShown: false }} name='Login'  component={Login} />
            <Stack.Screen options={{ headerShown: false }} name='rotasPrivadas' component={RotasPrivadas}/>
            <Stack.Screen options={{ headerShown: false }} name="UserPsicologa" component={TelaPsicologa} />
            <Stack.Screen options={{ headerShown: false }} name="Atendimento Especialista" component={AtendimentoEspecialista} />
            <Stack.Screen options={{ headerShown: false }} name="Tela Historico" component={Telahistorico} />
                    
                
      </Stack.Navigator>
    
  );
}


