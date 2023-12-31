import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet,Image, Button,ActivityIndicator, TouchableOpacity, Pressable, Alert } from 'react-native';
import moment from 'moment/moment';
import {Calendar,LocaleConfig} from 'react-native-calendars';
import axios from  'axios';
import { MaterialIcons,Feather  } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-web';
import {  useNavigation } from '@react-navigation/native';
import Reagendar from '../screensUsers/Reagendamento';
import util from '../util/util';
import styleWebMobile from '../style';
import styleWebMobileUsers from '../styleUsers';
import { Dimensions } from 'react-native';






const Reagendamento =   ({data, horario , id, id_especialista, servicoId, email}) => {

  const [date, setDate] = useState(new Date())
  const [markedDates, setMarkedDates] = useState({});
  const [hora, setHorario] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHorario, setselectedHorario] = useState();
  const [setdados, setDados] = useState();
  const [dados, setDatas] = useState([]);
  const [horaa, sethoraa] = useState([]);
  const [navegar, setNavegar] = useState();
  const [showCalendar, setshowCalendar] = useState(true);
  const [showHorarios, setshowHorarios] = useState(false);

  const navigation = useNavigation();

 // console.log(servicoId)

    const fetchApi = async () => {
        const especialidade = id_especialista;
       // const servicoId = servicoid;
        const dataApi = new Date();
    
        const dados = {
          dataApi,
          especialidade,
          servicoId
        };
       // console.log(dados)
               
  try{
    
    
    const response = await axios.post(util.urlHorariosDisponiveis, dados);
    const diasSemanaDisponiveis = response.data.agenda || [];
   
    setHorario(diasSemanaDisponiveis)
    // Atualize as marcações de datas
    const marked = {};
    diasSemanaDisponiveis.forEach((dia) => {
      marked[dia.data[0]] = { selected: true, selectedColor: '#e77825' };
    });

    setMarkedDates(marked);
    setshowCalendar(true)
    setIsLoading(false);
  }
  catch (erro){
    console.warn('Não foi possível buscar os dados da API');
    alert('Não foi possível buscar os dados da API');
   refrestPage()
  }
  
  }; 
 
  
    useEffect(() => {
    setIsLoading(true);
    //fetchApiReagendar();
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
    return (
      <View>
    <Reagendar  dataSelecionada= {selectedDate} horarioSelecionada= {selectedHorario} id={id} id_especialista={id_especialista} servicoId={servicoId} email={email}/>

      </View>
  )
  }
  const width = Dimensions.get('window').width
  //setDimension(width)
//console.log(width)
  if (width > 800) {

  return (
    <>
    <View style={{backgroundColor: '#4B4544', justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <View style={styles.container}>
        <View style={styles.containerGrid}>
          <View style={styles.containerInfo}>
            <View style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
              
            <Text style={styles.textDate}>Data agendada: {dataHoje}</Text>
            <Text style={styles.textDate}>Hora agendada: {dataHojeHoras}</Text>
            
            <Text style={styles.textDate}><Feather name="map-pin" size={24} color="white"style={{marginRight: 5}} />Psicologa Matriz</Text>
          
            <Text style={styles.textDateh}> <MaterialIcons name="timer" size={15} color="white" style={{marginRight: 5}}/>1h</Text>
            
            </View>
            <View style={{justifyContent:  'center'}} aria-valuetext='image'>
                      <Image source={require('../../assets/MicrosoftTeams-image (1).png')} style={{width: 250, height: 250, alignItems: 'center', marginTop: 15}}/> 

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
  </View>
  </>
  
  )}
  else{
    return(
      <>
     <View style={{backgroundColor: '#4B4544', justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <View style={styles.containerM}>
          <View style={styles.containerGridM}>
            <View style={styles.containerInfoM}>
              <Text style={styles.textDate}>Data: {dataHoje}</Text>
              
              <Text style={styles.textDate}><Feather name="map-pin" size={24} color="white"style={{marginRight: 5}} />Massoterapeuta Matriz</Text>
            
              <Text style={styles.textDateh}> <MaterialIcons name="timer" size={15} color="white" style={{marginRight: 5}}/>20 min</Text>
            
            </View>
            {/* Calendário!! */}
            {
              showCalendar? 
            <View style={styles.Calendar}>

            <CompCalendario/>
            </View>
              : null

            }

            {/* Horarios*/}
            {
              showHorarios? 
              <View style={styles.containerGridsM}>
              <View style={{flexDirection: 'column', justifyContent:'center'}}>   
                 <Text style={styles.textDate}>Data Selecionada: {selectedDate}</Text>
                 <View style={{alignContent: 'flex-start', alignItems: 'flex-start'}}>
                        <TouchableOpacity  onPress={() => {setshowHorarios(false), setshowCalendar(true), setSelectedDate('')}}><Ionicons name="ios-arrow-back" size={24} color="white"  /></TouchableOpacity>

                  </View>
                    <View style={styles.containerHorario}>
                      <ScrollView contentContainerStyle={styles.contentContainer}>
                       

                      <View style={styles.containerHorariosDisponiveis}>
                          <Text style={{fontSize: 14, color: 'white', marginBottom:15, alignItems:'center', marginRight:10}}>Horários disponíveis</Text>
                    
                          { hora ? horaa.map((horario, indice1) => {
                          return(
                          
                          horario.map((horarios, indice2) => {
                                    // console.log(horarios, selectedDate, dataHoje, horaHoje)
                                    
                            if(selectedHorario === horarios ){
                            
                              if( selectedDate === dataHoje && selectedHorario < horaHoje ){
                                 alert('Horário indiponivel!!');
                                return(
                              
                                  <View key={`${indice1}-${indice2}`} style={styles.horarioContainer}>
                                      <View>
        
                                      <TouchableOpacity
                                      onPress={(event) => handleHorarioSelecionado(event, horarios)}
                                      style={styles.btnHorarioM}
                                    >
                                      <Text style={{color: 'white', fontSize: 14, padding:10}}>{horarios}</Text>
                                    </TouchableOpacity>
                                      </View>
                                  </View>
                                )
                              }else {
                            return(
                         
                            <View key={`${indice1}-${indice2}`} style={styles.horarioContainer}>
                                <View style={{padding: 10}}>
                                <TouchableOpacity 
                                onPress={(event) => handleHorarioSelecionado(event, horarios)}
                                style={styles.btnHorarioM}
                              >
                                <Text style={{color: 'white', fontSize: 14, padding:10}}>{horarios}</Text>
                               
                              </TouchableOpacity>
                                
                                </View>
                                 <Button title='avancar' color={'#e77825'} onPress={() => agendar('formsAgendamento')}/>
        
                            </View>
                           
                          )}
                       
                        }else{
                          
                            return(
                              
                              <View key={`${indice1}-${indice2}`} style={styles.horarioContainer}>
                                  <View>
        
                                  <TouchableOpacity
                                  onPress={(event) => handleHorarioSelecionado(event, horarios)}
                                  style={styles.btnHorarioM}
                                >
                                  <Text style={{color: 'white', fontSize: 14, padding:10}}>{horarios}</Text>
                                </TouchableOpacity>
                                  </View>
                              </View>
                            )
                          }
                          
                        
                        })
                       ) })
                       : <ActivityIndicator size={30} color={'blue'}/> 
                      }
                      </View>
                      </ScrollView> 
                    </View>
                     
                </View>
              </View>
              : null
            }
           
           

          </View>

        </View>
    </View>
    
      </>
    )
  }};
  
 
const styles = styleWebMobile;
/*
StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e77825',
    width: '60%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 30,
    margin: 30,
    flexDirection: 'column',
  }, 
  containerGrid: {
    flexDirection: 'row',
    backgroundColor: '#090707',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 30,
    width: '98%',
    height: '98%',
  
    
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
*/
export default Reagendamento;
