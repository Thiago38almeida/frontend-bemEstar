import React, { useEffect, useState } from 'react';
import { View, Text, CheckBox,StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import TelaPsicologa from './psicologa';
import Telahistorico from './historico';
import UserIcon from '../../components/iconUsers';
import WeekdayButtons from '../../components/DiasDaSemana'
import axios from 'axios';
import ControleAgendas from '../../components/controlAgendas';




const AtendimentoEspecialista = ({navigation}) => {
  const [diasSelecionados, setDiasSelecionados] = useState([]);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [exibirTela, setexibirTela] = useState(false);
  const [navegacao, setnavegacao] = useState();
  const [dados, setDados] = useState();


  const handleTelaPsicologa =  (event) => {
    //console.log(event)
    setnavegacao(event)

   setexibirTela(true)
  
  
  }
  const handleTelaHistórico = (event) => {
    //console.log(event)
    setnavegacao(event)

    setexibirTela(true)

}
const handleTelaDisponibilidade = (event) => {
  //console.log(event)
  setnavegacao(event)

  setexibirTela(true)

}

if(exibirTela && navegacao === 'UserPsicologa'){
 // setexibirTela(false)
  return(
      <View><TelaPsicologa /></View>
  )

  
}else if(exibirTela && navegacao === 'Tela Historico'){
 // setexibirTela(false)
  return(
    <View><Telahistorico/></View>
  )
}else if(exibirTela && navegacao === 'Atendimento Especialista'){
  return(
       <View><AtendimentoEspecialista/></View>
      )
}

  return (
    <View style={{justifyContent:'center'}}>
        <View style={[styles.header, {justifyContent: 'center' }]}>
          <View style={{left: '33%'}}>
          <UserIcon/>

          </View>
       
          <View style={styles.headerBtn}>
            <TouchableOpacity  id='especialidade' style={styles.btn} onPress={() =>handleTelaPsicologa('UserPsicologa')}>
              <Text>Pendentes</Text>
            </TouchableOpacity>
            <TouchableOpacity  id='especialidade' style={styles.btn} onPress={() => handleTelaHistórico('Tela Historico')}>
              <Text>Histórico</Text>
            </TouchableOpacity>
            <TouchableOpacity  id='especialidade' style={styles.btn} onPress={() => handleTelaDisponibilidade('Atendimento Especialista')}>
              <Text>Disponibilidade</Text>
            </TouchableOpacity>
            
          </View>
        </View>
        
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={true} >
        <Text>Definir Dias de Atendimento</Text>
      <WeekdayButtons/>
      <View>
      <ControleAgendas />

      </View>

      
    
        </ScrollView>

        
      </View>
        
     
    </View>
  );
};

export default AtendimentoEspecialista;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50, // Ajuste este valor conforme necessário
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  headerBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  btn: {
    width: '30%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginBottom: 10,
  },
  
    });