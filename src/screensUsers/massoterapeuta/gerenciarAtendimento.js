import React, { useEffect, useState } from 'react';
import { View, Text,Image, CheckBox,StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import UserIcon from '../../components/iconUsers';
import WeekdayButtons from '../../components/DiasDaSemana'
import ControleAgendas from '../../components/controlAgendas';
import TelaMasso from './massoterapia';
import Telahistorico from './historico';
import LogoMundial from '../../components/logosMundial';




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

if(exibirTela && navegacao === 'UserMasso'){
 // setexibirTela(false)
  return(
      <View><TelaMasso /></View>
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

          <LogoMundial/>
       
          <View style={styles.headerBtn}>
            <TouchableOpacity  id='especialidade' style={styles.btn} onPress={() =>handleTelaPsicologa('UserMasso')}>
              <Text style={{fontSize: 22, alignItems: 'center', fontFamily: 'Harabara'}}>Pendentes</Text>
            </TouchableOpacity>
            <TouchableOpacity  id='especialidade' style={styles.btn} onPress={() => handleTelaHistórico('Tela Historico')}>
              <Text style={{fontSize: 22, alignItems: 'center', fontFamily: 'Harabara'}}>Histórico</Text>
            </TouchableOpacity>
            <TouchableOpacity  id='especialidade' style={styles.btn} onPress={() => handleTelaDisponibilidade('Atendimento Especialista')}>
              <Text style={{fontSize: 22, alignItems: 'center', fontFamily: 'Harabara'}}>Disponibilidade</Text>
            </TouchableOpacity>
            
          </View>
        </View>
        
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={true} >
        <Text style={{ fontFamily: 'Harabara', fontSize: 20}}>Definir Dias de Atendimento</Text>
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
    width: '33,3%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginBottom: 10,
    fontSize:22
  },
  logo: {
    //resizeMode:'contain',
    width: 100,
    height: 100,
    position: "absolute",
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    left: '9%',
    marginTop: -15
},
logo2: {
//resizeMode:'contain',
width: 100,
height: 100,
position: "absolute",
justifyContent: 'flex-start',
alignContent: 'flex-start',
left: '15%',
  marginTop: -15

},
  
    });