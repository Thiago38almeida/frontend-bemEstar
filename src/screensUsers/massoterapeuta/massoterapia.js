import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet,TouchableOpacity,Button, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";
import { Feather,FontAwesome, MaterialCommunityIcons  } from '@expo/vector-icons'; 
import moment from "moment/moment";
//import { Feather,FontAwesome } from '@expo/vector-icons'; 
import UserIcon from "../../components/iconUsers";
import util from "../../util/util";
import AtendimentoEspecialista from "./gerenciarAtendimento";
import Telahistorico from "./historico";
import LogoMundial from "../../components/logosMundial";
import Reagendamento from "../../components/reagendar";


const TelaMasso = ({navigation}) => {
    const [dados, setDados] = useState([]);
    const [exibirTela, setexibirTela] = useState(false);
    const [navegacao, setnavegacao] = useState();
    const [pageAtual, setPageAtual] = useState(1);
    const [reAgendar, setReagendar] = useState();


    const dadosArmazenados = sessionStorage.getItem('dados');
    const dadosLogados = JSON.parse(dadosArmazenados);
    const headers ={
      headers: {
      'authorization': `Bearer ${dadosLogados.token}`
    }
    }
    

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(util.urlGetAgendamento + dadosLogados.especialidade + '/' + dadosLogados.user,
          headers);
          setDados(response.data);
  
        } catch (error) {
          console.log(error);
          alert('erro ao buscar os dados')
        }
      };

  
      fetchData();
    }, []);

   

const handleTelaMasso =  (event) => {

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

if(exibirTela && navegacao === 'UserMasso'){
 // setexibirTela(false)
  return (
  <View>
    <TelaMasso />
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
 
   let totalPage = Math.ceil(pageAtual * limitador / limitador);
 
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
 
 return {
   resultado: result,
  totalPages: totalPage
 };
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
 const {resultado, totalPages}=  filtroDataRecente(dados,pageAtual,limitador);
 
 async function exportToExcel() {
  try {
    if (resultado.length === 0) {
      console.log('Não há dados para exportar para o Excel.');
      return;
    }

    await util.ExportToExcel('pendentes',resultado);
  } catch (error) {
    console.log(error);
  }
}
async function cancelarAgenda(event) {

  await axios.delete(util.urlDeleteAgendamento + event, headers)
  .then((response)=>{
    //console.log(response)
    alert('Agendamento deletado com sucesso!')
    util.refrestPage();
  })
  .catch(()=>alert("Erro ao deletar agendamento"), util.refrestPage())
  
 

  
}
function reagendar(event){
  alert(event)
  setReagendar(event)
setexibirTela(true)


}
if(exibirTela){
  return (
  <View>
    <Reagendamento data={reAgendar.data} horario={reAgendar.hora} id={reAgendar.id} id_especialista={reAgendar.id_especialista} servicoId={reAgendar.servicoId}/>
    </View>)
}
  
const Card = ({ title, description }) => {
  const [expanded, setExpanded] = useState(false);

  const handleCardPress = () => {
    setExpanded(!expanded);
  };
  if(!title && !description){
    return(
    <>
      <ActivityIndicator size={100}  />
      <Text>Nenhum agendamento pendente</Text>
    </>);
  }

  return (
  
    <TouchableOpacity id='*' onPress={handleCardPress}>
         <View style={styles.cardContainer}>
          <Text style={styles.title1}>{title}</Text>
          {expanded && 
            <View style={styles.descriptionContainer}>
              <View style={styles.infoContainer}>
              
                <View style={styles.infoAgendas}>

                  <Text style={styles.label}><Text style={{fontStyle: 'normal', fontWeight:'bold'}}>Horario:</Text> {moment(description.hora).format('HH:mm')}</Text>
                  <Text style={styles.label}><Text style={{fontStyle: 'normal', fontWeight:'bold'}}>Nome:</Text> {description.nome}</Text>
                  <Text style={styles.label} ><Text style={{fontStyle: 'normal', fontWeight:'bold'}}>Email:</Text> {description.email}</Text>
                  <Text style={styles.label} ><Text style={{fontStyle: 'normal', fontWeight:'bold'}}>Telefone:</Text> {description.telefone}</Text>
                  <Text style={styles.label} ><Text style={{fontStyle: 'normal', fontWeight:'bold'}}>Setor:</Text> {description.setor}</Text>
                </View> 
                    

                        <TouchableOpacity id='#1' onPress={() => cancelarAgenda(description.id)}
                        style={{
                          borderWidth: 1,
                          borderColor: '#000',
                          borderRadius: 30,
                          padding: 10,
                          alignItems: 'center',
                          marginRight: 5,
                           }}>
                          <Text style={{ fontFamily: 'Harabara', fontSize: 20}} >
                          <Feather name="trash-2" size={24} color="black" />
                          Cancelar 
                          </Text>

                        </TouchableOpacity>
                        <TouchableOpacity id='#2' onPress={() => reagendar(description)} style={{
                          borderWidth: 1,
                          
                          borderColor: '#000',
                          borderRadius: 30,
                          padding: 10,
                          alignItems: 'center',
                          
                          }}>
                          <Text style={{ fontFamily: 'Harabara', fontSize: 20}}>  
                            <FontAwesome name="send-o" size={24} color="black" />
                            Reagendar
                          </Text>
                        </TouchableOpacity>
                    </View>
              </View>
           
          }
          </View>
       
  </TouchableOpacity> 
  

  );

};


    if(dados.length > 0){
   
    return (
      <View style={{justifyContent:'center'}}>
      <View style={[styles.header, {justifyContent: 'center' }]}>
        <View style={{left: '33%'}}>
        <UserIcon/>

        </View>

        <LogoMundial/>
     
        <View style={styles.headerBtn}>
          <TouchableOpacity style={styles.btn} onPress={() =>handleTelaMasso("UserMasso")}>
            <Text  style={{fontSize: 22, alignItems: 'center'}}>Pendentes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleTelaHistórico("Tela Historico")}>
            <Text style={{fontSize: 22, alignItems: 'center'}}>Histórico</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleTelaDisponibilidade("Atendimento Especialista")}>
            <Text style={{fontSize: 22, alignItems: 'center'}}>Disponibilidade</Text>
          </TouchableOpacity>
          
        </View>
      </View>

      <View style={{backgroundColor: '#eeeeec'}}>
      <Button onPress={exportToExcel} title='exportar' color={'green'} />

          <ScrollView  >
        <View style={styles.grid}>
          
          {resultado.map((agendamento) => (

            <View key={agendamento.id} style={styles.card}>
            <Card   title={moment(agendamento.data).format('DD/MM/YYYY')} description={agendamento}></Card>
            

            </View>
          ))}
           <View style={{flexDirection: 'row', justifyContent:'flex-end', alignItems:'flex-end'}}>

            <TouchableOpacity id='menu' style={styles.btnNextPrev} onPress={() => nextPreviuos(1)}>
              <MaterialCommunityIcons name="page-next" size={24} color="black" /><Text>Próxima</Text></TouchableOpacity>
            <TouchableOpacity id='menu' style={styles.btnNextPrev} onPress={() => nextPreviuos(-1)}>
              <MaterialCommunityIcons name="page-previous" size={24} color="black" /><Text>Anteriror</Text></TouchableOpacity>

            </View>
                    
        </View>
    </ScrollView>
          </View>
           

    </View>
   
      
    );
  }  else{
    return (
      <View style={{justifyContent:'center',backgroundColor: '#eeeeec'}}>
      <View style={[styles.header, {justifyContent: 'center' }]}>
        <View style={{left: '33%'}}>
        <UserIcon/>
       
        </View>
          <LogoMundial/>
        <View style={styles.headerBtn}>
          <TouchableOpacity style={styles.btn} onPress={() =>handleTelaPsicologa("UserPsicologa")}>
            <Text style={{fontSize: 22, alignItems: 'center', fontFamily: 'Harabara'}}>Pendentes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleTelaHistórico("Tela Historico")}>
            <Text style={{fontSize: 22, alignItems: 'center', fontFamily: 'Harabara'}}>Histórico</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleTelaDisponibilidade("Atendimento Especialista")}>
            <Text style={{fontSize: 22, alignItems: 'center', fontFamily: 'Harabara'}}>Disponibilidade</Text>
          </TouchableOpacity>
          
        </View>
      </View>
      <Text style={{textAlign: 'center', fontSize: 50,alignItems: 'center'}}>Nenhum agendamento pendente....</Text>
      <TouchableOpacity style={{textAlign: 'center', fontSize: 50,alignItems: 'center'}} onPress={() => window.location.reload()}>
        <Text style={{textAlign: 'center', fontSize: 25,alignItems: 'center', marginTop: 30}}>Caso tenha algum agendamento, atualize a página clicando aqui!! </Text>
      </TouchableOpacity>
     
     </View>
     
       )

  }
}
export default TelaMasso;

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
  fontSize: 22,
},
logo: {
  //resizeMode:'contain',
  width: 100,
  height: 100,
  position: "absolute",
  justifyContent: 'flex-start',
  alignContent: 'flex-start',
  left: '9%',
  marginTop: -15
},
logo2: {
//resizeMode:'contain',
width: 100,
height: 100,
position: "absolute",
justifyContent: 'flex-start',
alignContent: 'flex-start',
left: '15%',
marginTop: -15

},
btnNextPrev:{
  flex: 1,
  justifyContent:"space-evenly",
  alignItems: 'center',
  maxWidth: 75,
  
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

