import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet,Image, Button,ActivityIndicator, TouchableOpacity, Pressable, Alert, Dimensions } from 'react-native';
import moment from 'moment/moment';
import {Calendar,LocaleConfig} from 'react-native-calendars';
import axios from  'axios';
import { MaterialIcons,Feather, Ionicons } from '@expo/vector-icons'; 
import { FlatList, ScrollView } from 'react-native-web';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import FormsAgendamento from '../../components/FormsAgendamento';
import util from '../../util/util';
import styleWebMobile from '../../style';
import { useNavigate } from 'react-router-dom';


const AgendamentoMassoNeolog =   () => {

  const [date, setDate] = useState(new Date())
  const [markedDates, setMarkedDates] = useState({});
  const [hora, setHorario] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHorario, setselectedHorario] = useState();
  const [horaa, sethoraa] = useState([]);
  const [showCalendar, setshowCalendar] = useState(true);
  const [showHorarios, setshowHorarios] = useState(false);
  const [navegar, setNavegar] = useState();
  const [dimensions, setDimension] = useState();

  const navigation = useNavigate();
  const especialidade = 'massoterapia';
  const servicoId = 'massoterapiaGLP';
 

    const fetchApi = async () => {
      const especialidade = 'massoterapia';
      const servicoId = 'massoterapiaGLP';
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
         navigation('/')
       }
       else{
       setHorario(diasSemanaDisponiveis)
       // Atualize as marcações de datas
       const marked = {};
       diasSemanaDisponiveis.forEach((dia) => {
         marked[dia.data[0]] = { selected: true, selectedColor: '#e77825' };
       });
   
       setMarkedDates(marked);
       setshowCalendar(true)
       setIsLoading(false);
     }}
    catch (erro){
      console.warn('Não foi possível buscar os dados da API');
      alert('Não foi possível buscar os dados da API');
   navigation('/')
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
            style={{width: '99%', height: '99%'}}
               onDayPress={handleDayPress}
              markedDates={{
                ...markedDates,
                [selectedDate]: { selected: true, selectedColor: 'orange' },
                //disableTouchEvent: {...markedDates} 
              }
             
            }
              //disableAllTouchEventsForDisabledDays={true}
              
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
  const dataHoje = moment().format('YYYY-MM-DD')
  const horaHoje = moment().format('HH:mm')
    //navegação para telas
  
  if(navegar) {    
    return <FormsAgendamento  dataSelecionada= {selectedDate} horarioSelecionada= {selectedHorario} id_especialista={especialidade} servicoId={servicoId}/>
  
  }
  
  
  const width = Dimensions.get('window').width
  //setDimension(width)
//console.log(width)
  if (width > 800) {
  return (
    <View style={{backgroundColor: '#4B4544', justifyContent: 'center', alignItems: 'center', flex: 1}}>
    <View style={styles.container}>
      <View style={styles.containerGrid}>
        <View style={styles.containerInfo}>
          <View style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
          <Text style={styles.textDate}>Data: {dataFormat}</Text>
          
          <Text style={styles.textDate}><Feather name="map-pin" size={24} color="white"style={{marginRight: 5}} />Massoterapeuta Neolog</Text>
         
          <Text style={styles.textDateh}> <MaterialIcons name="timer" size={15} color="white" style={{marginRight: 5}}/>20 min</Text>
          
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
                                    // console.log(horarios, selectedDate, dataHoje, horaHoje)
                                    
                            if(selectedHorario === horarios ){
                            
                              if( selectedDate === dataHoje && selectedHorario < horaHoje ){
                                 alert('Horário indiponivel!!');
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
                                )
                              }else {
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
                           
                          )}
                       
                        }else{
                          
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
      </View>

     
    </View>
  </View>
  
  
  )}
  else{
    return(
      <>
     <View style={{backgroundColor: '#4B4544', justifyContent: 'center', alignItems: 'center', flex: 1, width: '100%'}}>
      <View style={styles.containerM}>
          <View style={styles.containerGridM}>
            <View style={styles.containerInfoM}>
              <Text style={styles.textDate}>Data: {dataFormat}</Text>
              
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
  }
}
  
//const widht = Dimensions.get('') 
const styles = styleWebMobile;
//const stylesM = styleMobile;

export default AgendamentoMassoNeolog;
