import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,CheckBox,ScrollView, ActivityIndicator } from 'react-native';
//import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import axios from 'axios';
import util, { refrestPage } from '../util/util';



const WeekdayButtons = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [selectedHours, setSelectedHours] = useState([]);
   const [press, setPress] = useState(false);
   const availableHours = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
  ];

  const dadosArmazenados = sessionStorage.getItem('dados');
  const dadosLogados = JSON.parse(dadosArmazenados);

const config ={
headers: {
'authorization': `Bearer ${dadosLogados.token}`
}
}
//console.log(dadosArmazenados)

const especialidade = dadosLogados.especialidade
const servicoId = dadosLogados.user



  const handleDaySelection = (day, index) => {
    if (selectedIndex.includes(index) && selectedDays.includes(day)) {
      setSelectedIndex(selectedIndex.filter((selectedIndex) => selectedIndex !== index));
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
    } else {
      setSelectedIndex([...selectedIndex, index]);
      setSelectedDays([...selectedDays, day]);
    }
  };

  const renderButton = (day, index) => {
    const isDaySelected = selectedDays.includes(day);
    const buttonStyle = isDaySelected ? styles.selectedButton : styles.button;
    const textStyle = isDaySelected ? styles.selectedButtonText : styles.buttonText;

    return (
      <TouchableOpacity
        key={index}
        id={`especialidade-${index}`}
        style={buttonStyle}
        onPress={() => handleDaySelection(day, index)}
      >
        <CheckBox
          id={`especialidade-${index}`}
          name='check'
          value={isDaySelected}
          onValueChange={() => handleDaySelection(day, index)}
          tintColors={{ true: '#e77825', false: 'white' }}
        />
        <Text style={textStyle}>{moment().weekday(index).locale('pt-br').format('dddd').toUpperCase()}</Text>
      </TouchableOpacity>
    );
  };

  const handleSave = async () => {
    setPress(true);

    const IndexDia = selectedIndex;
    const HorarioInicio = selectedHours[0];
    const HorarioFim = selectedHours[1];

    const horaInicio = new Date(`1970-01-01T${HorarioInicio}:00`);
    const horaFim = new Date(`1970-01-01T${HorarioFim}:00`);

    if (horaInicio > horaFim) {
      alert(
        'Horario de inicio maior que o horario fim! \n Por gentileza refazer corretamente a seleção'
      );
      setPress(false); // Resetando o indicador
      return;
    }

    //const especialidade = 'psicologa';
    //const colaboradorId = especialidade;
    const dias = IndexDia;
    const inicio = horaInicio;
    const fim = horaFim;

    const dados = {
      especialidade,
     colaboradorId: [servicoId],
      dias,
      inicio,
      fim,
      servicoId
    };

    try {
      const response = await axios.post(util.urlPosthorarioServico, dados,config
        );
       // console.log(response)
      if(response.data.status === 201){
        alert(response.data.mensagem)
        refrestPage()
      } 
      else{
      alert('Horario de atendimento alterado!');
      setSelectedDays('');
      setSelectedHours('');
      setSelectedIndex('');
      //setEspecialidade('');
      refrestPage()
    }
  } catch (error) {
      console.log(error);
      alert('Erro ao realizar a requisição. Por favor, tente novamente.');
      util.refrestPage()
    }

    setPress(false); // Resetando o indicador após a requisição
  };
 
  const handleHourSelection = (hour) => {

console.log(hour)

      if (selectedHours.includes(hour)) {
        setSelectedHours(selectedHours.filter((selectedHour) => selectedHour !== hour));
  
      } else {
        setSelectedHours([...selectedHours, hour]);
      }
    };
  

    return (
      <View style={{flex:1, flexWrap:'wrap', maxWidth: 700}}>
        <View style={{ flexDirection: 'row', justifyContent:'center', }}>
          <TouchableOpacity
            id='especialidade-psicologaGLP'
            //onPress={() => handleEspeciladade(servicoId)}
            style={[
              styles.colaboradorIdrButton,
              servicoId === 'psicologaGLP' && styles.selectedcolaboradorIdButton,
            ]}
          >
            <Text style={{ fontFamily: 'Harabara', fontSize: 20}}>ID especialidade logada: {servicoId}</Text>
          </TouchableOpacity>
  
         </View>
  
        <View style={styles.buttonsContainer}>
          {moment.weekdays().map((day, index) => renderButton(day, index))}
        </View>
      {
      press && <ActivityIndicator size={100} color={'orange'} />
    }
      <Text style={{ fontFamily: 'Harabara', fontSize: 20, textAlign: 'center'}}>Horários Disponíveis Selecionados:</Text>
      <ScrollView horizontal={true} contentContainerStyle={{flex:1, flexGrow: 1, flexDirection: 'row' }}>
    <View style={{flexDirection:'column'}}>
      <View>
      <View style={{ flexDirection: 'row' }}>
        {availableHours.slice(0, 6).map((hour) => (
          <TouchableOpacity
            key={hour}
            id='especialidade3'
            style={[
              styles.hourButton,
              selectedHours.includes(hour) && styles.selectedHourButton,
            ]}
            onPress={() => handleHourSelection(hour)}
          >
            <Text style={styles.hourButtonText}>{hour}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  
    <View>
      <View style={{ flexDirection: 'row' }}>
        {availableHours.slice(6).map((hour) => (
          <TouchableOpacity
          id='especialidade1'
          
            key={hour}
            style={[
              styles.hourButton,
              selectedHours.includes(hour) && styles.selectedHourButton,
            ]}
            onPress={() => handleHourSelection(hour)}
          >
            <Text style={styles.hourButtonText}>{hour}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
    </View>
  
    </ScrollView>
   
      <TouchableOpacity  id='especialidade9' onPress={() => handleSave()} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  fontFamily: 'source sans pro',
  fontSize:'small',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    padding: 5,
    backgroundColor: '#e77825',
    borderRadius: 5,
  },
  selectedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    padding: 5,
    backgroundColor: '#e77825',
    borderRadius: 5,
  },
  buttonText: {
    marginLeft: 5,
  },
  selectedButtonText: {
    marginLeft: 5,
    fontWeight: 'bold',
  },
  hourButton: {
    width: 80,
    height: 30,
    margin: 5,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e77825',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedHourButton: {
    backgroundColor: 'lightblue',
  },
  hourButtonText: {
    fontSize: 12,
  },
  colaboradorIdrButton: {
    flexGrow: 1,
    width: 50,
    height: 30,
    margin: 5,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e77825',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedcolaboradorIdButton: {
    
    minWidth: 200,
    maxWidth: 400,
    backgroundColor: '#e77825',
    borderBottomWidth: 1,
    borderColor: '#e77825',
    shadowColor: "#000",
    elevation: 5,
    shadowOffset: {
      width: -4.9876e-314,
      height: 1.5,
      },
      shadowOpacity: 0.5,
      shadowRadius: 1.5,
      opacity: .9,

    

  },
  saveButton: {
    position:"absolute",
    bottom:-20,
    left:10,
    zIndex:1,
  




  },
  saveButtonText: {
    backgroundColor: '#e77825',
    color:'white',
    width: 120,
    textAlign: 'center',
    alignItems: 'center',
  }
});

export default WeekdayButtons;
