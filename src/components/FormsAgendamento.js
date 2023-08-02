import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, Dimensions } from 'react-native';
import { MaterialIcons,Feather  } from '@expo/vector-icons'; 
import axios from 'axios';
import util from '../util/util';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import styleWebMobile from '../style';



const FormsAgendamento = ({ dataSelecionada, horarioSelecionada, id_especialista, servicoId}) => {

//const { selectedDate, selectedHorario } = route.params;
const navigation = useNavigation();

const [selectedDate, setSelectedDate] = useState();
const [selectedHorario, setSelectedHorario] = useState();
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [setor, setSetor] = useState('ADM');

useEffect(() => {
    setSelectedDate(dataSelecionada);
    setSelectedHorario(horarioSelecionada);
  }, [])

  const dataCombinada = moment(selectedDate).format('YYYY-MM-DD') + ' ' + selectedHorario;
  const dataFormatada = moment(dataCombinada, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm');

//console.log(setor)

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
 if(
  name === '' || email ===''||
  dataFormatada === '' ||
  setor === '' ||
  id_especialista === '' ||
  servicoId === ''
 )
 {
   alert('Erro! Formulário de agendamento preenchido incorretamente!')
   setName('')
   setSetor('')
   setEmail('')
   util.refrestPage();
 }
 else{

   try{
   const response = await axios.post(util.urlAgendamento, dados)
   // console.log(response)
   
    alert(`Você está agendando para ${name}, dia ${selectedDate}. Horário: ${selectedHorario} no email: ${email}`)
    alert(`Reserva realizada com sucesso!`)
    setTimeout(() => {
      navigation.goBack();
      setSelectedDate('')
      setSelectedHorario('')
      setName('')
      setSetor('')
      setEmail('')
      }, 2000);

   
  }
  catch(err){
    console.error('Erro ao tentar realizar o cadastro')
   
    alert("Não foi possível fazer a reserva")
    setTimeout(() => {
      navigation.goBack();
      setSelectedDate('')
      setSelectedHorario('')
      setName('')
      setSetor('')
      setEmail('')
      }, 2000);

      throw err
  
  }
}
 }

function voltar(tela) {
 // console.log(`${tela}`)
  setSelectedDate('');
  setSelectedHorario('');

  navigation.navigate('Home');

}

function handleSelectChange(event){
  const selectedValue = event.target.value;
  setSetor(selectedValue)
}

const width = Dimensions.get('window').width
//setDimension(width)
//console.log(width)
if (width < 400) {

  return (
  <View style={{justifyContent: 'center', alignItems: 'center'}}>
    <View style={styles.containerM}>
      <View style={styles.containerGridM}>
        <View style={styles.containerInfoM}>
          <View style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                   
          <Text style={styles.textDate}><Feather name="map-pin" size={24} color="white"style={{marginRight: 5}} />Espaço Bem Estar</Text>
         
          <Text style={styles.textDateh}> <MaterialIcons name="supervised-user-circle" size={24} color="black" style={{marginRight: 6}} />{servicoId}</Text>
          
          </View>
            <View style={{justifyContent:  'center'}} aria-valuetext='image'>
                      <Image source={require('../../assets/MicrosoftTeams-image (1).png')} style={{width: 250, height: 250, alignItems: 'center', marginTop: 15}}/> 

            </View>

        </View>
        
       <View style={styles.containerInputM}>
            <Text style={styles.inputBtnM}>Data:</Text>
            <TextInput
            nativeID='diaSelecionado'
            style={styles.input}
            onChangeText={(text) => setSelectedDate(text)}
            defaultValue={selectedDate}
            editable={false}/>
            <Text style={styles.inputBtnM}>Horario:</Text>
            <TextInput
             nativeID='horarioSelecionado'
            style={styles.input}
            onChangeText={(text) => setSelectedHorario(text)}
            defaultValue={selectedHorario}
            editable={false}/>
             <Text style={styles.inputBtnM}>Nome:</Text>
            <TextInput
             nativeID='nome'
            
            style={styles.input}
            onChangeText={(text) => setName(text)}
            />

            <Text style={styles.inputBtnM}>E-mail:</Text>
            <TextInput
             nativeID='email'
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
            />
            <Text style={styles.inputBtnM}>Setor:</Text>
            <select name='Seleção-setor'style={styles.input} required onChange={(event) => handleSelectChange(event)}>
                    <option value='ADM' style={{color: 'black'}}>ADM</option>
                    <option value='Operacional' style={{color: 'black'}}>Operacional</option>
                  </select>
          <View style={styles.button}>

            <Button title='agendar' accessibilityLabel='agendar' color={'orange'}  onPress={() => agendar()} />
            <Button title='Voltar' accessibilityLabel='voltar'  color={'orange'} onPress={() => voltar(servicoId)}/>
            
          </View>
           

       </View>
           

        </View>
    </View>
  </View>
  );
}else{
  return (
  <View style={{backgroundColor: '#4B4544', justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <View style={[styles.container, {width: '45%'}]}>
        <View style={[styles.containerGrid, {justifyContent:'space-between'}]}>
          <View style={[styles.containerInfo, {padding: 10, width: '50%'}]}>
            <View style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                    
            <Text style={styles.textDate}><Feather name="map-pin" size={24} color="white"style={{marginRight: 5}} />Espaço Bem Estar</Text>
         
            <Text style={styles.textDateh}> <MaterialIcons name="supervised-user-circle" size={20} color="white" style={{marginRight: 6}} />{servicoId}</Text>
         
            </View>
              <View style={{justifyContent:  'flex-start', left: 5}} aria-valuetext='image'>
                        <Image source={require('../../assets/MicrosoftTeams-image (1).png')} style={{width: 250, height: 250, alignItems: 'center', marginTop: 15}}/> 

              </View>

          </View>        
            <View style={styles.containerInput}>
                  <Text style={styles.inputBtnM}>Data:</Text>
                  <TextInput
                  nativeID='diaSelecionado'
                  style={styles.input}
                  onChangeText={(text) => setSelectedDate(text)}
                  defaultValue={selectedDate}
                  editable={false}/>
                  <Text style={styles.inputBtnM}>Horario:</Text>
                  <TextInput
                  nativeID='horarioSelecionado'
                  style={styles.input}
                  onChangeText={(text) => setSelectedHorario(text)}
                  defaultValue={selectedHorario}
                  editable={false}/>
                  <Text style={styles.inputBtnM}>Nome:</Text>
                  <TextInput
                  nativeID='nome'
                  
                  style={styles.input}
                  onChangeText={(text) => setName(text)}
                  />

                  <Text style={styles.inputBtnM}>E-mail:</Text>
                  <TextInput
                  nativeID='email'
                  style={styles.input}
                  onChangeText={(text) => setEmail(text)}
                  />
                  <Text style={styles.inputBtnM}>Setor:</Text>
                  <select name='Seleção-setor'style={styles.input} required onChange={(event) => handleSelectChange(event)}>
                    <option value='ADM' style={{color: 'black'}}>ADM</option>
                    <option value='Operacional' style={{color: 'black'}}>Operacional</option>
                  </select>
                
                <View style={styles.button}>

                  <Button title='agendar' accessibilityLabel='agendar' color={'orange'}  onPress={() => agendar()} />
                  <Button title='Voltar' accessibilityLabel='voltar'  color={'orange'} onPress={() => voltar()}/>
                  
                </View>
                

            </View>
            

        </View>
      </View>
  </View>
  );
}
}
const styles = styleWebMobile;


export default FormsAgendamento;
