import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet,Image, Button,ActivityIndicator, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import moment from 'moment/moment';
import {Calendar,LocaleConfig} from 'react-native-calendars';
import axios from  'axios';
import { MaterialIcons,Feather,Ionicons   } from '@expo/vector-icons'; 
//import { ScrollView } from 'react-native-web';
import {  useNavigation } from '@react-navigation/native';
import Reagendar from '../screensUsers/Reagendamento';
import util from '../util/util';
import TelaErro from './telaErro';
import styleWebMobile from '../style';






const Reagendamentos =   ({data, horario , id, id_especialista, servicoId}) => {

  const [date, setDate] = useState(new Date())
  const [markedDates, setMarkedDates] = useState({});
  const [hora, setHorario] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHorario, setselectedHorario] = useState();
  const [setdados, setDados] = useState(true);
  const [dados, setDatas] = useState([]);
  const [horaa, sethoraa] = useState([]);
  const [navegar, setNavegar] = useState();
  const [showCalendar, setshowCalendar] = useState(true);
  const [showHorarios, setshowHorarios] = useState(false);
 

 // const navigation = useNavigation();
  const queryString = window.location.search;

  // Cria um objeto URLSearchParams a partir da string de consulta
  const params = new URLSearchParams(queryString);
  
  // Obtém os valores dos parâmetros
  const param1 = params.get('param1');
  const param2 = params.get('param2');
  const param3 = params.get('param3');
  const param4 = params.get('param4');
  const param5 = params.get('ref');
  
 // console.log(p,d,r,t,i);
    const fetchApi = async () => {
      
        const dataApi = new Date();
    
        const dados = {
          dataApi,
          especialidade: param4,
          servicoId: param1
        };
       // console.log(dados)
               
  try{

    const response = await axios.get(util.urlGetAgendamento + param5)
    const res = response.data

    //console.log(res.length)

    if(res.length > 0){
    
    
    const response = await axios.post(util.urlHorariosDisponiveis, dados);
    const diasSemanaDisponiveis = response.data.agenda || [];
   
    setHorario(diasSemanaDisponiveis)
    // Atualize as marcações de datas
    const marked = {};
    diasSemanaDisponiveis.forEach((dia) => {
      marked[dia.data[0]] = { selected: true, selectedColor: '#e77825' };
    });

    setMarkedDates(marked);
    setIsLoading(false);
    setshowCalendar(true);
    //setDados(true)
  }
  else {

    params.delete(queryString)
    setDados(false);

  
  
}}
  catch (erro){
    console.warn('Não foi possível buscar os dados da API');
    alert('Não foi possível buscar os dados da API');
   
  }
  
  }; 
 
  
    useEffect(() => {
    setIsLoading(true);
    //fetchApiReagendar();
    fetchApi();
      
    }, []);
  
  if(!setdados){
    return (
       
      <View style={{flex:1, justifyContent:'center', alignItems:"center"}}>
      <TelaErro/>
    </View>
    )
  }

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
    setshowHorarios(true)
    setshowCalendar(false)
     
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

  //Selecionar horario disponivel

  function handleHorarioSelecionado(event, horarios) {
    console.log('Horário selecionado:', horarios);
    setselectedHorario(horarios)
    
    
  }

  // Navegar para tela forms

  function agendar(tela) {
   setNavegar(tela)
   
  }
  const dataHoje = moment(data).format('DD/MM/YYYY')
  const dataHojeHoras = moment(horario).format('HH:mm')


    //navegação para telas
  
  if(navegar) {    
    return <Reagendar  dataSelecionada= {selectedDate} horarioSelecionada= {selectedHorario} id={param5} id_especialista={id_especialista} servicoId={servicoId}/>
  
  }

  const dimensions = Dimensions.get('window').width;


  if(dimensions < 400) {
    return (
      <View style={{flex:1,justifyContent: 'center', alignItems: 'center', alignContent:'center', backgroundColor: '#4B4544'}}>
        <View style={style.containerM}>
          <View style={style.containerGridM}>
            <View style={style.containerInfoM}>
             <Text style={style.textDate}>Data agendada: {param2}</Text>
              <Text style={style.textDate}>Hora agendada: {param3}</Text>
              
              <Text style={style.textDate}><Feather name="map-pin" size={24} color="white"style={{marginRight: 5}} />{param1}</Text>  
            </View>
           {/* Calendário!! */}
            
            {
              showCalendar? 
                <View style={style.Calendar}>
                  <CompCalendario/>
                </View>
                        : null
            }
             {
                showHorarios?
                  <View style={styles.containerGridsM}>
                    <View style={{alignContent: 'flex-start', alignItems: 'flex-start'}}>
                        
                        <TouchableOpacity  onPress={() => {setshowHorarios(false), setshowCalendar(true), setSelectedDate('')}}><Ionicons name="ios-arrow-back" size={24} color="white"  /></TouchableOpacity>
                        <Text style={{fontSize: 14, color: 'white', marginBottom:15, alignItems:'center', marginRight:10}}>Horários disponíveis</Text>

                    </View>
                    
                          <ScrollView contentContainerStyle={styles.contentContainer}>
                          <View style={styles.containerHorariosDisponiveis}>
                        
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
                                    style={style.btnHorarioM}
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
                                      style={style.btnHorarioM}
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
                      : null
              }
                         
          </View>
        </View>
      </View>     
      
      )
  }

  return (
  <View style={{flex:1,justifyContent: 'center', alignItems: 'center', alignContent:'center', backgroundColor: '#4B4544'}}>
    <View style={styles.container}>
      <View style={styles.containerGrid}>
        <View style={styles.containerInfo}>
          <View style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
            
          <Text style={styles.textDate}>Data agendada: {param2}</Text>
          <Text style={styles.textDate}>Hora agendada: {param3}</Text>
          
          <Text style={styles.textDate}><Feather name="map-pin" size={24} color="white"style={{marginRight: 5}} />{param1}</Text>
              <Image source={require('../../assets/MicrosoftTeams-image (1).png')} style={{width: 200, height:200}}/>       
          </View>
            <View style={{justifyContent:  'center'}} aria-valuetext='image'>
                     
            </View>

        </View>
              <View style={{flexDirection: 'column', justifyContent:'center'}}>
                  <Text style={[styles.textDate,{marginTop: 20} ]}
                          >Escolha uma data e horário para reagendar</Text>
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
  </View>
   
  
  )};
  
 const style = styleWebMobile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e77825',
    width: '60%',
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
  width: '40%'
},

containerHeaderCalendario: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'center',
  height: 100,
} ,
textDate: {
  fontSize: 17,
  fontWeight: 'bold',
  color: 'white',
  alignItems: 'center',
  height: 50,
  textAlign: 'center',
 
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
  fontFamily: 'sans-serif',
  color: 'white',
  padding: 6,
  borderColor: '#e77825',
  borderWidth: 1

},

heading: {
  fontSize: 20,
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

export default Reagendamentos;
