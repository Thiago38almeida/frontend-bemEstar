import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, Button, ActivityIndicator, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import moment from 'moment/moment';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { refrestPage } from '../util/util';
import util from '../util/util';
import { Card } from './cardHorarios';


const ControleAgendas = () => {


  const [hora, setHorario] = useState([]);
  const [setnull, setNull] = useState(null);


  useEffect(() => {
    //setIsLoading(true);
    fetchApi();

  }, []);

  const fetchApi = async () => {

    const dadosArmazenados = sessionStorage.getItem('dados');
    const dadosLogados = JSON.parse(dadosArmazenados);



    const headers = {
      headers: {
        'authorization': `Bearer ${dadosLogados.token}`
      }
    }


    try {
      const response = await axios.get(util.urlGEThorarioFuncio + dadosLogados.especialidade + '/' + dadosLogados.user, headers);

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
    catch (erro) {
      console.warn('Não foi possível buscar os dados da API', erro);
      alert('Não foi possível buscar os dados da API');
      //refrestPage()
    }
  };



  return (
    <View>
      <Card data={hora} edit={setnull} setNull={setNull} />
    </View>
  );
};



export default ControleAgendas;
