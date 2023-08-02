import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet,Image, Button,ActivityIndicator, TouchableOpacity, Pressable, Alert, TextInput } from 'react-native';
import moment from 'moment/moment';
import {Calendar,LocaleConfig} from 'react-native-calendars';
import axios from  'axios';
import { MaterialIcons,Feather  } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-web';
import {  useNavigation } from '@react-navigation/native';
import Reagendar from '../screensUsers/Reagendamento';
import util from '../util/util';
import TelaErro from './telaErro';






const CancelamentoagendamentosScreen =   () => {

  
  const [dados, setDados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [setAgenda, setAgendamento] = useState();
  

  const navigation = useNavigation();
  const queryString = window.location.search;

  // Cria um objeto URLSearchParams a partir da string de consulta
  const params = new URLSearchParams(queryString);
  
  // Obtém os valores dos parâmetros
  const param1 = params.get('p');
  
    const fetchApi = async () => {
    
               
  try{
    
    
    const response = await axios.get(util.urlGetAgendamento + param1);
    const agendamento = response.data;
   if(agendamento.length > 0){
    setAgendamento(agendamento)
    // Atualize as marcações de datas
   
  }
  else{
    params.delete('p')
    setDados(false)

  }
}
  catch (erro){
    console.warn('Não foi possível buscar os dados');
    alert('Não foi possível buscar os dados');
   util.refrestPage()
  }
  
  }; 
 
  
    useEffect(() => {
    setIsLoading(true);
    //fetchApiReagendar();
    fetchApi();
      
    }, []);

  if(!dados){
    return (
    <View style={{flex:1, justifyContent:'center', alignItems:"center"}}>
      <TelaErro/>
    </View>)
  }

  async function  cancelarAgendamento() {
    try{
     
        const response = await axios.delete(util.urlDelAgendamento + param1)
          console.log(response.data)
          Alert.alert("", "O agendamento foi cancelado com sucesso!")

    }
    catch({message}){
      console.error("Erro ao tentar excluir o agendamento", message )
      Alert.alert("", `Falha na requisição! ${message}`)
      //util.refrestPage()
      setIsLoading(false)

      }
      finally{
      navigation.navigate('Home')

      }
      };

  
  

  return (
  <View style={{flex:1,justifyContent: 'center', alignItems: 'center', alignContent:'center', backgroundColor: '#4B4544'}}>
    <View style={styles.container}>
      <View style={styles.containerGrid}>
          <View style={styles.containerInfo}>
            <View style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
              <Image source={require('../../assets/MicrosoftTeams-image (1).png')} style={{width: 250, height:250}}/>
            <Text style={styles.textDate}>Cancelar Agendamento</Text>
          
            
            </View>
              <View style={{justifyContent:  'center', width: '100%'}} aria-valuetext='image'>
                            {isLoading ? (
                <>
                  {setAgenda && setAgenda.length > 0 ? (
                    setAgenda.map((dados, indice1) => {
                      console.log(dados);
                      return (
                        // Aqui você pode renderizar os dados mapeados conforme necessário
                        // Por exemplo, criar componentes para exibir as informações de cada 'dados'
                        <View key={indice1} style={ {flex:1, justifyContent:'center', alignItems: 'center', flexDirection:'row', flexWrap:'wrap'}}>
                          <TextInput
                          id='data'
                          value={moment(dados.data).format('DD/MM/YYYY').toUpperCase()}
                          editable={false}
                          style={styles.inputs}
                          />
                          <TextInput
                          id='hora'
                          value={moment(dados.hora).format("HH:mm").toUpperCase()}
                          editable={false}
                          style={styles.inputs}/>
                          <TextInput
                          id='especialista'
                          value={dados.id_especialista.toUpperCase()}
                          editable={false}
                          style={styles.inputs}/>
                          <TextInput
                          id='servicoId'
                          value={dados.servicoId.toUpperCase()}
                          editable={false}
                          style={styles.inputs}/>

                          <Button onPress={cancelarAgendamento} title='Cancelar' color={'#e77825'} testID='button'  />
                        </View>
                      );
                    })
                  ) : (
                   <TelaErro/>
                  )}
                </>
              ) : (
                <>
                  <Text>Aguarde......</Text>
                  <ActivityIndicator size={100} color={'orange'} />
                </>
              )}

              
              </View>

          </View>
        </View>
      </View>
    </View>

      
  
  )};
  
 
const styles = StyleSheet.create({
 container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#e77825',
  width: '65%',
  height: '40%',
  borderColor: 'black',
  borderWidth: 1,
  borderRadius: 30,
  margin: 50
  

  
}, 
containerGrid: {
  flexDirection: 'row',
  backgroundColor: '#090707',
  borderWidth: 1,
  borderRadius: 30,
  maxWidth:'98%',
  height: '98%',
  //width: '100%'

  
},

containerInfo: {
  alignItems: 'center',
  padding: 50,
  marginBottom: 10,
  width: '100%'
},
textDate: {
  fontSize: 22,
  margin: 15,
  fontWeight: 'bold',
  color: 'white',
  alignItems: 'center',
  fontFamily: 'Harabara',
  height: '100%',
  width:'100%'
,  textAlign: 'center'
},
textDateh: {
  fontSize: 15,
  color: 'white',
  marginTop: 10
},
heading: {
  fontSize: 20,
  textAlign: 'center',
  margin: 10,
  color: 'white'
  

},
inputs: {
  width:150,
  color: 'black', 
  alignItems: 'center',
  backgroundColor:'white',
  borderRadius :20,
  borderWidth:1.5,
  padding: 20,
  marginBottom: 20,

},
button: {
  borderRadius: 10,
  borderColor:"#FFFFFF",
  width: '15%',
  margin: 20
}
})

export default CancelamentoagendamentosScreen;
