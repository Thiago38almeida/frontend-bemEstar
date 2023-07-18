import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet,Image, Button,ActivityIndicator,TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import moment from 'moment/moment';
import {Calendar,LocaleConfig} from 'react-native-calendars';
import axios from  'axios';
import { useNavigation } from '@react-navigation/native';
import { refrestPage } from '../util/util';
import util from '../util/util';
import { Card } from './cardHorarios';


const ControleAgendas =   () => {

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
  useEffect(() => {
    //setIsLoading(true);
    fetchApi();
      
    }, []);

    const fetchApi = async () => {

        const dadosArmazenados = localStorage.getItem('dados');
        const dadosLogados = JSON.parse(dadosArmazenados);
    
  
    const headers ={
      headers: {
      'authorization': `Bearer ${dadosLogados.token}`
    }
    }
     const especialidade = 'psicologa';
      const servicoId = 'psicologaGLP';
      
  
      
  try{
      const response = await axios.get(util.urlGEThorarioFuncio + especialidade + '/'+ servicoId, headers);

      const diasSemanaDisponiveis = response.data// || [];
    //  console.log(response.data)
     
      setHorario(diasSemanaDisponiveis)
      // Atualize as marcações de datas
      /*
      const marked = {};
      diasSemanaDisponiveis.forEach((dia) => {
        marked[dia.data[0]] = { selected: true, selectedColor: '#e77825' };
      });*/
  
     
    }
    catch (erro){
      console.warn('Não foi possível buscar os dados da API', erro);
      alert('Não foi possível buscar os dados da API');
     //refrestPage()
    }
    };

 
  
    return (
      <View>
        <Card data={hora} edit={setnull} setNull={setNull}/>
      </View>
    );
  };

  
 
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  editableItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    marginRight: 8,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  saveButton: {
    backgroundColor: 'blue',
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
 })
export default ControleAgendas;
