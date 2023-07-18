import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image } from 'react-native';
import { MaterialIcons,Feather  } from '@expo/vector-icons'; 
import axios from 'axios';
import util from '../util/util';



const FormsAgendamento = ({ dataSelecionada, horarioSelecionada, id_especialista, servicoId}) => {

//const { selectedDate, selectedHorario } = route.params;

const [selectedDate, setSelectedDate] = useState();
const [selectedHorario, setSelectedHorario] = useState();
const [name, setName] = useState();
const [email, setEmail] = useState();
const [setor, setSetor] = useState();

useEffect(() => {
    setSelectedDate(dataSelecionada);
    setSelectedHorario(horarioSelecionada);
  }, [])

  const dataCombinada = moment(selectedDate).format('YYYY-MM-DD') + ' ' + selectedHorario;
  const dataFormatada = moment(dataCombinada, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm');



 async function agendar() {
    const dados ={
        "data": selectedDate,
        "email":email,
        "nome": name,
        "hora": dataFormatada,
        "setor": setor,
        "id_especialista": id_especialista,
        "servicoId": servicoId
 }
   try{
   const response = await axios.post(util.urlAgendamento, dados)
   // console.log(response)
   
    alert(`Você está agendando para ${name}, dia ${selectedDate}. Horário: ${selectedHorario} no email: ${email}`)
   
  }
  catch(err){
    console.error('Erro ao tentar realizar o cadastro')
    throw err
    //alert("Não foi possível fazer a reserva")
  
  }
}

function voltar() {
  navigation.navigate(servicoId);
  setSelectedDate('');
  setSelectedHorario('');
}

  return (
    <View style={styles.container}>
      <View style={styles.containerGrid}>
        <View style={styles.containerInfo}>
          <View style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                   
          <Text style={styles.textDate}><Feather name="map-pin" size={24} color="white"style={{marginRight: 5}} />{servicoId}</Text>
         
          <Text style={styles.textDateh}> <MaterialIcons name="timer" size={15} color="white" style={{marginRight: 5}}/>20 min</Text>
          
          </View>
            <View style={{justifyContent:  'center'}} aria-valuetext='image'>
                      <Image source={require('../../assets/MicrosoftTeams-image (1).png')} style={{width: 250, height: 250, alignItems: 'center', marginTop: 15}}/> 

            </View>

        </View>
        
       <View style={styles.containerInput}>
            <Text style={styles.inputBtn}>Data:</Text>
            <TextInput
            nativeID='diaSelecionado'
            style={styles.input}
            onChangeText={(text) => setSelectedDate(text)}
            defaultValue={selectedDate}
            editable={false}/>
            <Text style={styles.inputBtn}>Horario:</Text>
            <TextInput
             nativeID='horarioSelecionado'
            style={styles.input}
            onChangeText={(text) => setSelectedHorario(text)}
            defaultValue={selectedHorario}
            editable={false}/>
             <Text style={styles.inputBtn}>Nome:</Text>
            <TextInput
             nativeID='nome'
            
            style={styles.input}
            onChangeText={(text) => setName(text)}
            />

            <Text style={styles.inputBtn}>E-mail:</Text>
            <TextInput
             nativeID='email'
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
            />
            <Text style={styles.inputBtn}>Setor:</Text>
            <TextInput
             nativeID='setor'
            style={styles.input}
            onChangeText={(text) => setSetor(text)}
            />
          <View style={styles.button}>

            <Button title='agendar' accessibilityLabel='agendar' color={'orange'}  onPress={() => agendar()} />
            <Button title='Voltar' accessibilityLabel='voltar'  color={'orange'} onPress={() => voltar()}/>
            
          </View>
           

       </View>
           

        </View>
      </View>
  );
};

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
    marginTop: 16,
    flexDirection: "row",
    justifyContent:'center',
    alignItems: 'center',
    width:'100%',
    maxWidth: 700,
   // minWidth: 500,
    height: 500,
    alignSelf: 'center',
    backgroundColor: 'black',
    borderRadius: 30,
},
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
containerInput: {
flex: 1,
alignItems: 'center',
flexWrap: 'wrap-reverse',
},
inputBtn:{
color: 'white',
flexDirection:'row'
},
containerInfo: {
        alignItems: 'center',
        padding: 50,
        marginBottom: 10,
        borderRightColor: 'white',
        borderRightWidth: 1,
        width: 350
      },
 input: {
    height: 50,
    borderColor: '#7159c1',
    borderWidth: 3,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginVertical: 8,
    paddingHorizontal: 16,
    
    

  },
  button: {
    alignSelf: "center",
    justifyContent:"space-between",
    flexDirection: 'row',
    padding:10,
    marginRight: 5

  }
});

export default FormsAgendamento;