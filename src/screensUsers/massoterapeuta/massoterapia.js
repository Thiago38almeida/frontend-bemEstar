import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList,TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import Menu from "../../components/menusLine";
import axios from "axios";
import Asyncstorage from '@react-native-async-storage/async-storage'
import moment from "moment/moment";
import { Feather,FontAwesome,FontAwesome5  } from '@expo/vector-icons'; 
import UserIcon from "../../components/iconUsers";
//import TelaPsicologa from './psicologa';

import Telahistorico from "../psicologa/historico";
import AtendimentoEspecialista from "../psicologa/GerenciamentoAtendimento";

//import {AiOutlineCloseCircle} from "react-icons"



const TelaPsicologa = ({navigation}) => {
    const [dados, setDados] = useState([]);
    const [exibirTela, setexibirTela] = useState(false);
    const [navegacao, setnavegacao] = useState();
    const [pageAtual, setPageAtual] = useState(1);


  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://172.18.50.128:9091/bemEstar/agenda_psi');
          setDados(response.data);
          const token = Asyncstorage.getItem('token')  
        } catch (error) {
          console.log(error);
        }
      };

  
      fetchData();
    }, []);

const token = Asyncstorage.getItem('token')
//console.log(token)
  
   

    function cancelarAgenda() {
      alert('cancelar ')
    }
    function reagendar(){
      alert('reagendar')
}

     //Renderizar tela Psicologa > Pendentes
function Navegar(tela){
  console.log(tela)
  
      navigation.navigate(tela)
}

const handleTelaPsicologa =  (event) => {

    setnavegacao(event)
    setexibirTela(true)
}
  const handleTelaHistórico = (event) => {
    //console.log(event)
    setnavegacao(event)
    setexibirTela(true)

}
const handleTelaDisponibilidade = (event) => {
 // console.log(event)
  setnavegacao(event)
  setexibirTela(true)
  }

if(exibirTela && navegacao === 'UserPsicologa'){
 // setexibirTela(false)
  return (
  <View>
    <TelaPsicologa />
  </View>)
}
 if(exibirTela && navegacao === 'Tela Historico'){
 // setexibirTela(false)
  return (
  <View>
    <Telahistorico/>
    </View>)
      
  
}else if(exibirTela && navegacao === 'Atendimento Especialista'){
  return(
       <View>
      <AtendimentoEspecialista/>
      </View>
      )
}


//filter para os agendamentos recente

function filtroDataRecente(itens, pageAtual, limitador){
 // let data = moment().format('DD/MM/YYYY')
  let result = [];

  itens.sort((a, b) => moment(b.data).diff(moment(a.data)));

  let totalPage = Math.ceil(pageAtual * limitador);

  let count = ( pageAtual * limitador) - limitador;

  let delimitador = count + limitador

  if (pageAtual <= totalPage){
    for (let i=count ;i<delimitador;i++){
      if (itens[i] != null){
        //result.push(<Agenda key={i+1}/>)
        result.push(itens[i]);
}
  count++;
}

return result;
}


}


const limitador = 10


function nextPreviuos(value){
 // console.log(value)
  let NovapageAtual = pageAtual + value;

  if (NovapageAtual > 0 && NovapageAtual <= Math.ceil(dados.length / limitador)){
    setPageAtual(NovapageAtual)
  }
}
//dados filtrados e ordenados pelo mais recente
const dadosFiltrados = filtroDataRecente(dados,pageAtual,limitador);



  
    const Card = ({ title, description }) => {
      const [expanded, setExpanded] = useState(false);
    
      const handleCardPress = () => {
        setExpanded(!expanded);
      };
    
      return (
        <TouchableOpacity onPress={handleCardPress}>
            <View style={styles.cardContainer}>
              <Text style={styles.title}>{title}</Text>
              {expanded && 
                <View style={styles.descriptionContainer}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.label}>Horário:</Text>
                    {description.map((desc, index) => (
                      
                      <Text style={styles.description} key={index}>{desc}</Text>
                      
                    ))}
                          <View style={{justifyContent:'space-between', flexDirection: 'row'}}>

                            <TouchableOpacity onPress={cancelarAgenda}
                            style={{
                              borderWidth: 1,
                              borderColor: '#000',
                              borderRadius: 30,
                              padding: 10,
                              alignItems: 'center',
                              marginRight: 5,
                               }}>
                              <Text >
                              <Feather name="trash-2" size={24} color="black" />
                              Cancelar 
                              </Text>

                            </TouchableOpacity>
                            <TouchableOpacity onPress={reagendar} style={{
                              borderWidth: 1,
                              
                              borderColor: '#000',
                              borderRadius: 30,
                              padding: 10,
                              alignItems: 'center',
                              
                              }}>
                              <Text>  
                                <FontAwesome name="send-o" size={24} color="black" />
                                Reagendar
                              </Text>
                            </TouchableOpacity>
                        </View>
                  </View>
                </View>
              }
            </View>
      </TouchableOpacity> 

      );
    
    };

    if(dados){
   
    return (
      <View style={{justifyContent:'center', width:'100%',backgroundColor: 'white'}}>
      <View style={[styles.header, {justifyContent: 'center' }]}>
        <View style={{left: '33%'}}>
        <UserIcon/>

        </View>
     
        <View style={styles.headerBtn}>
          <TouchableOpacity style={styles.btn} onPress={() =>handleTelaPsicologa("UserPsicologa")}>
            <Text>Pendentes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleTelaHistórico("Tela Historico")}>
            <Text>Histórico</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleTelaDisponibilidade("Atendimento Especialista")}>
            <Text>Disponibilidade</Text>
          </TouchableOpacity>
          
        </View>
      </View>

      <TouchableOpacity onPress={() => nextPreviuos(1)}><Text>Próxima página</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => nextPreviuos(-1)}><Text>Página Anteriror</Text></TouchableOpacity>
          <TouchableOpacity><Text>{pageAtual}</Text></TouchableOpacity>
      
    <ScrollView style={styles.container} >
        <View style={styles.grid}>
        
          {dadosFiltrados.map((agendamento) => (
            <View key={agendamento.id} style={styles.card}>
            <Card   title={moment(agendamento.data).format('DD/MM/YYYY')} description={[moment(agendamento.hora).format('HH:mm'), agendamento.email]}></Card>
            

            </View>
          ))}

          <TouchableOpacity onPress={() => nextPreviuos(1)}><Text>Próxima página</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => nextPreviuos(-1)}><Text>Página Anteriror</Text></TouchableOpacity>
          <TouchableOpacity><Text>{pageAtual}</Text></TouchableOpacity>
        </View>
    </ScrollView>

    </View>
   
      
    );
  } else {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Carregando...</Text>
      <ActivityIndicator size={200} color={'orange'}/>
     
      </View>
       )

  }
}
export default TelaPsicologa;

const styles = StyleSheet.create({
container:
{
  width: '100%',
  backgroundColor: '#ffff',
  marginTop: 50,
},
header: {
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  backgroundColor: 'white',
  borderRadius: 4,
},
headerBtn: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
  marginTop: 10,
},
btn: {
  width: '30%',
  height: 50,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 15,
  marginBottom: 10,
},
grid: {
    
    width:'100%',
    maxWidth:900,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginRight: 'auto',
    marginLeft: 'auto',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    
    },
    infoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    label: {
      fontWeight: 'bold',
      marginRight: 5,
    },
    
card: {
  margin: 5,
  backgroundColor: 'white',
  
    },
item: {
  width: '100%',
  height: 80,
backgroundColor: '#f9c2ff',
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
      },
cardContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
        borderRadius: 15,
       
      },
descriptionContainer: {
        flexDirection: 'row',
        padding: 20,
        margin: 10,

      },
title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
      },
description: {
        fontSize: 14,
        color: 'gray',
        flexWrap: 'wrap',
        padding: 5
       
      },
text: {
  fontSize: 18,
  color: 'black',
  textAlign: 'center',
  justifyContent:  'space-between',
  padding: 20,

}
       
})
