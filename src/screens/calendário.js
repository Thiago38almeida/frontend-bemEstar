import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet,Image, Button,ActivityIndicator} from 'react-native';
import moment from 'moment/moment';
import {Calendar,LocaleConfig} from 'react-native-calendars';
import HorariosD from './horariosD';

export default function CompCalendario({markedDates, hora, isLoading}) {

    const [selectedDate, setSelectedDate] = useState();
    const [horaa, sethoraa] = useState();

    console.log(markedDates, hora, isLoading)

   // setSelectedDate(selectedDates);

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

            <View>
                <HorariosD selectedDate={selectedDate} hora={hora} horaa={horaa} isLoading={isLoading} />
            </View>
          </>
        )
       }
      </View>
        )
        
  }
