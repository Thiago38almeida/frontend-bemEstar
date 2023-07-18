import React, {useEffect, useState} from 'react';
import { Text,Linking, View, StyleSheet,Image, Button,ActivityIndicator, TouchableOpacity, Pressable, Alert } from 'react-native';
import moment from 'moment/moment';
import {Calendar,LocaleConfig} from 'react-native-calendars';
import axios from  'axios';
import { MaterialIcons,Feather  } from '@expo/vector-icons'; 
import { FlatList, ScrollView } from 'react-native-web';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import FormsAgendamento from '../../components/FormsAgendamento';
import util, { refrestPage } from '../../util/util';



const AgendamentoPsicologaMatriz =   () => {

  const [date, setDate] = useState(new Date())
  const [markedDates, setMarkedDates] = useState({});
  const [hora, setHorario] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHorario, setselectedHorario] = useState();
  const [setnull, setNull] = useState(null);
  const [horaa, sethoraa] = useState([]);
  const [navegar, setNavegar] = useState();

  const navigation = useNavigation();

    const fetchApi = async () => {
      const especialidade = 'psicologa';
      const servicoId = 'psicologaMatriz';
      const dataApi = new Date();
  
      const dados = {
        dataApi,
        especialidade,
        servicoId
      };
  try{
      const response = await axios.post(util.urlHorariosDisponiveis, dados);
      const diasSemanaDisponiveis = response.data.agenda || [];
     
      if(diasSemanaDisponiveis.length <= 0){
       alert('Sem horarios disponiveis!!');
        navigation.navigate('Home')
      }
      else{
      setHorario(diasSemanaDisponiveis)
      // Atualize as marcações de datas
      const marked = {};
      diasSemanaDisponiveis.forEach((dia) => {
        marked[dia.data[0]] = { selected: true, selectedColor: '#e77825' };
      });
  
      setMarkedDates(marked);
      setIsLoading(false);
    }}
    catch (erro){
      console.warn('Não foi possível buscar os dados da API');
      alert('Não foi possível buscar os dados da API');
     refrestPage()
    }
    };
  
    useEffect(() => {
    setIsLoading(true);
    fetchApi();
      
    }, []);
  
  

  function CompCalendario() {

    LocaleConfig.locales['pt-br'] = {
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      dayNames: [
  
        'Domingo',
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado'
  
      ],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      today: 'Hoje',
    }
  
    LocaleConfig.defaultLocale='pt-br';

    // Dia pressionado
   const handleDayPress = (day) => {
      setSelectedDate(day.dateString);
      
    const horarioSelecionado = hora.find(
        (horario) => horario.data.toString() === day.dateString
      );

  if(horarioSelecionado){
    const horariosDisponiveis =  horarioSelecionado.horariosLivres;
   
    sethoraa(horariosDisponiveis)
     
}

setselectedHorario('')
}
     
  
    return (
      <View>
        {isLoading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <>
            <Calendar
            style={styles.Calendar}
               onDayPress={handleDayPress}
              markedDates={{
                ...markedDates,
                [selectedDate]: { selected: true, selectedColor: 'orange' },
                
              }}
              theme={{
                backgroundColor: 'white',
                calendarBackground: 'black',
               // todayBackgroundColor: 'orange',
                textSectionTitleColor: 'white',
                selectedDayBackgroundColor: 'white',
                selectedDayTextColor: 'white',
                todayTextColor: 'white',
                dayTextColor: 'white',
                textDisabledColor: 'gray',
                arrowHeight: 20,
                monthTextColor: 'white',
                 arrowWidth: 20,
                arrowColor: 'white',
                arrowsHitSlop: 20,
                textMonthFontSize: 20,
                textDayHeaderFontSize: 14,
                
               // contentStyle: styles.containerDate
              }}
              minDate= {moment().format('YYYY-MM-DD')}
              disabledByDefault={true}
            />
          </>
        )
       }
      </View>
        )
        
  }

  // Array de dias disponíveis
  const dataFormat = moment(date).format('DD/MM/YYYY')

  //Selecionar horario disponivel

  function handleHorarioSelecionado(event, horarios) {
    console.log('Horário selecionado:', horarios);
    setselectedHorario(horarios)
    
    
  }

  // Navegar para tela forms

  function agendar(tela) {
   setNavegar(tela)
   
  }
  const dataHoje = moment().format('YYYY/MM/DD HH:mm')
  const dataHojeHoras = moment().format('HH:mm')

  const handleLinkPress = () => {
    const url = 'http://localhost:19006/Reagendamento';
    Linking.openURL(url);
  };
  
  if(navegar) {    
    return <FormsAgendamento  dataSelecionada= {selectedDate} horarioSelecionada= {selectedHorario}/>
  
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerGrid}>
        <View style={styles.containerInfo}>
          <View style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
          <Text style={styles.textDate} onPress={handleLinkPress}>Data: {dataFormat}</Text>
          
          <Text style={styles.textDate}><Feather name="map-pin" size={24} color="white"style={{marginRight: 5}} />Psicologa Matriz</Text>
         
          <Text style={styles.textDateh}> <MaterialIcons name="timer" size={15} color="white" style={{marginRight: 5}}/>1h</Text>
          
          </View>
            <View style={{justifyContent:  'center'}} aria-valuetext='image'>
                      <Image source={require('../../../assets/logo_mundial_cores.png')} style={{width: 250, height: 250, alignItems: 'center', marginTop: 15}}/> 

            </View>

        </View>
              <View style={{flexDirection: 'column', justifyContent:'center'}}>
                  <Text style={styles.textDate}
                          >Escolha uma data e horário</Text>
                <View style={styles.containerDate}>
                <CompCalendario />
                
                    <View style={styles.containerHorario}>
                      <ScrollView contentContainerStyle={styles.contentContainer}>
                      <View style={styles.containerHorariosDisponiveis}>
                          <Text style={{fontSize: 14, color: 'white', marginBottom:15, alignItems:'center', marginRight:10}}>Horários disponíveis</Text>
                    
                        { hora ? horaa.map((horario, indice1) => {
                          return(
                          
                          horario.map((horarios, indice2) => {
                                     
                            if(selectedHorario === horarios){
                              if(selectedDate === dataHoje && horarios < dataHoje){
                                 alert('HORARIO INDISPONIVEL');
                              } else{                             
                                 
                              
                            return(
                         
                            <View key={`${indice1}-${indice2}`} style={styles.horarioContainer}>
                                <View style={{padding: 10}}>
                                <TouchableOpacity 
                                onPress={(event) => handleHorarioSelecionado(event, horarios)}
                                style={styles.btnHorario}
                              >
                                <Text style={{color: 'white', fontSize: 14, padding:10}}>{horarios}</Text>
                               
                              </TouchableOpacity>
                                
                                </View>
                                 <Button title='avancar' color={'#e77825'} onPress={() => agendar('formsAgendamento')}/>

                            </View>
                           
                          );}}else{
                          
                            return(
                              
                              <View key={`${indice1}-${indice2}`} style={styles.horarioContainer}>
                                  <View>

                                  <TouchableOpacity
                                  onPress={(event) => handleHorarioSelecionado(event, horarios)}
                                  style={styles.btnHorario}
                                >
                                  <Text style={{color: 'white', fontSize: 14, padding:10}}>{horarios}</Text>
                                </TouchableOpacity>
                                  </View>
                              </View>
                            );
                          }
                          
                        
                        })); 
                      })
                       : 
                       <ActivityIndicator size={30} color={'blue'}/> 
                      }
                      </View>
                      </ScrollView> 
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
  backgroundColor: '#4B4544',
  borderRadius: 1,
  flexDirection: 'column'
  

  
}, 
containerGrid: {
  flexDirection: 'row',
  backgroundColor: '#090707',
  borderWidth: 1,
  borderRadius: 30,

  
},
Calendar: {
  flex: 1,
  justifyContent:  'center',
  width: 300


},
containerDate: {
  marginRight: 10,
  width:500,
  height: 500,
  alignItems: 'center',
  justifyContent: 'space-evenly',
  borderRadius: 1,
  flexDirection: 'row'
},
containerInfo: {
  alignItems: 'center',
  padding: 50,
  marginBottom: 10,
  borderRightColor: 'white',
  borderRightWidth: 1,
  width: 350
},

containerHeaderCalendario: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'center',
  height: 100,
} ,
textDate: {
  fontSize: 22,
  fontWeight: 'bold',
  color: 'white',
  alignItems: 'center',
  height: 50,
  textAlign: 'center'
},
textDateh: {
  fontSize: 15,
  color: 'white',
  marginTop: 10
},
containerHorario: {
  alignItems: 'center',
  maxHeight: 350,
 

},
ScrollContainer: {
  paddingVertical: 20,
  color: 'black',

},
containerHorariosDisponiveis: {
  flexDirection: 'column',
  flexWrap: 'wrap',
},
horarioContainer: {
  marginRight: 10,
  marginBottom: 10,
  alignItems: 'center',
  

},
btnHorario: {
  fontFamily: 'Keypass Demo',
  color: 'white',
  padding: 6,
  borderColor: '#e77825',
  borderWidth: 1

},

heading: {
  fontSize: 20,
  fontFamily: 'Keypass Demo',
  textAlign: 'center',
  margin: 10,
  color: 'white'
  

},
datas: {
    color: 'blue'
  },

  horarios: {
  color: 'black',
  fontSize: 20,
  borderWidth: 1,
  borderColor: 'blue',
  padding: 20,
  marginBottom: 5,
  textAlign: 'center',
  flexDirection: 'column',
  },
  containerHorarios: {
    width: '100%',
    color: 'black',
    fontSize: 20,
    fontFamily: 'Keypass Demo',
    padding: 20,
    borderWidth: 1,
    borderColor: 'black',
    fontWeight: 'bold',
    flexWrap: 'wrap',
    flex:1,
    marginTop: 5,
    marginBottom: 5
   

  },

  textHorariosSelecionado: {
  borderWidth: 1,
  borderColor: 'black',
  padding: 20,
  marginBottom: 5,
  textAlign: 'center',

  },
  textHorarios: {
  borderWidth: 1,
  borderColor: 'blue',
  padding: 20,
  marginBottom: 5,
  textAlign: 'center',   
    
  },
  containerButton: {
  marginTop: 20,
  alignItems: 'center',
  },
  });

export default AgendamentoPsicologaMatriz;
