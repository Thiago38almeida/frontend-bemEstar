import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import moment from 'moment/moment';
import {Calendar,LocaleConfig} from 'react-native-calendars';


export default function Agenda({navigation}) {
  const [date, setDate] = useState(moment({}))
  const [time, setTime] = useState(new Date())
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([
    
    { id: 1, horario: '09:00' },
    { id: 2, horario: '10:00' },
    { id: 3, horario: '11:00' },
    { id: 4, horario: '12:00' },
    { id: 5, horario: '14:00' },
  
  ]);
  const [horarioSelecionado, handleHorarioSelecionado] = useState('');
  
  
 // const format = date.toLocaleDateString()
  const dataFormat = date.format('DD/MM/YYYY')
  console.log(dataFormat)
  
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
    
     
   
      // Horário disponível, pode prosseguir com a lógica desejada
     // Ex. Enviar o horário selecionado para o backend
    // const response = axios.post('http://localhost:9091/agendar')
    // console.log('Horário selecionado:', horarios.horario, '\nDia selecionado:', dataFormat);
    const CompCalendario = () => {

      const [selectedDate, setselectedDate] = useState(false);

      const handleDayPress = (date) => {
        setselectedDate(date.dateString)
         console.log('selected:', date.dateString);
         

      }
      const isWeekday = (date) => {
       const day = date.dateString
        console.log(day)// Use o método isoWeekday() para obter o número do dia da semana (1 a 7)
       return day >= 1 && day <= 5; // Segunda a sexta-feira
      };
    
      const DayCustomStyle = (date) => {
        if (isWeekday(date)) {
          return( 
           console.log(date) // Estilo de texto para os dias da semana
          );
        }
        return null; // Deixe sem estilo personalizado para os demais dias
      };

     
      return (
        
          <Calendar
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            height: 350,
            width: 450,
          }}
            onDayPress={(date) => handleDayPress(date)}
            markedDates={{ [selectedDate]: { selected: true, selectedColor: 'orange' } }}
            
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              textSectionTitleDisabledColor: '#d9e1e8',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: 'orange',
              //disabledArrowColor: '#d9e1e8',
              monthTextColor: 'blue',
              indicatorColor: 'blue',
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
              cursor: 'pointer'
            }}
            dayComponent={({date, state}) => {
              return (
               console.log(date.dateString, state)
            
              );}}
           
            

           
            
          />
         
       
      );
    };


    
    
      
   
  return (
    
    <View style={styles.container}>
     
      <View style={styles.containerDate}>
        <View style={styles.containerInfo}>
          <Text style={styles.textDate}>Data: {dataFormat}</Text>
          </View>
         
    
    <View style={{flexDirection:  'column', margin: 15}}>
    
    { 
    
    horariosDisponiveis.map(function(horario){
      if(horarioSelecionado === horario ){
        return (
              
          <View key={horario.id}>
          <TouchableOpacity style={{marginTop: 5}}
        onPress={() => handleHorarioSelecionado(horario)}
          >
            
            <Text style={[
          horarioSelecionado === horario ? styles.containerHorariosSelecionado && styles.textHorariosSelecionado : containerHorarios
        ]}>{horario.horario}</Text>
          <Button title='avançar' color={'black'}  onPress={() => navigation.navigate('Formulario', { horarioSelecionado: horario }, {dataFormat: dataFormat})}/>
          </TouchableOpacity>
          
        
         </View>
    )}else{
      return (
              
        <View key={horario.id}>
        <TouchableOpacity style={styles.containerHorarios}
      onPress={() => handleHorarioSelecionado(horario)}
        >
          
          <Text style={[
        horarioSelecionado === horario ? styles.containerHorariosSelecionado && styles.textHorariosSelecionado : null
      ]}>{horario.horario}</Text>

        </TouchableOpacity>
      
       </View>
      )}
   
    }
    )}
            


  
</View>

</View>
</View>
);
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minWidth: 400,
    backgroundColor: '#4B4544'

    
  },
  containerDate: {
    width: '100%',
    flexWrap: 'wrap',
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingTop: 20,
    flexDirection:  'row',
    borderWidth: 1,
     borderColor: 'black',
    
    },
    weekdayContainer: {
      backgroundColor: 'yellow', // Defina a cor de fundo desejada para os dias da semana
    },
    weekdayText: {
      color: 'black', // Defina a cor de texto desejada para os dias da semana
    },
    containerInfo: {
     borderWidth: 1,
     borderColor: 'black',
     alignItems: 'flex-start',
     
     
     
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
    containerHorariosSelecionado: {
      backgroundColor: 'yellow',   

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