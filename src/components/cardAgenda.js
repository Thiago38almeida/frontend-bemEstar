import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Button, Dimensions } from "react-native";
import axios from "axios";
import moment from "moment/moment";
import { Feather, FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
//import { Feather,FontAwesome,FontAwesome5  } from '@expo/vector-icons'; 
import UserIcon from "../../components/iconUsers";
import Telahistorico from "./historico";
import AtendimentoEspecialista from "./GerenciamentoAtendimento";
import util, { urlPUTcomparecimento } from "../../util/util";
import Reagendamento from "../../components/reagendar";
import LogoMundial from "../../components/logosMundial";
import styleWebMobileUsers from "../../styleUsers";
import styleWebMobile from "../../style";

//import {AiOutlineCloseCircle} from "react-icons"



const TelaPsicologa = ({ navigation }) => {
  const [dados, setDados] = useState([]);
  const [exibirTela, setexibirTela] = useState(false);
  const [navegacao, setnavegacao] = useState();
  const [pageAtual, setPageAtual] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [reAgendar, setReagendar] = useState();

  const dadosArmazenados = sessionStorage.getItem('dados');
  const dadosLogados = JSON.parse(dadosArmazenados);
  //console.log(dadosLogados)

  // console.log(dadosLogados.match())
  //console.log("Token:",Asyncstorage.getItem('token'))
  //console.log(`Nome do usuario logado ${JSON.parse(dadosLogados[



  const headers = {
    headers: {
      'authorization': `Bearer ${dadosLogados.token}`
    }
  }





  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(util.urlGetAgendamento + dadosLogados.especialidade + '/' + dadosLogados.user,
          headers

        );
        setDados(response.data)


      } catch (error) {
        console.log(error);
        alert('erro ao buscar informações, faça o login novamente')
        navigation.navigate('Login')

      }
    }
  fetchData();
  }, []);


  //console.log(token)




  //Renderizar tela Psicologa > Pendentes
  const handleTelaPsicologa = (event) => {

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

  if (exibirTela && navegacao === 'UserPsicologa') {
    // setexibirTela(false)
    return (
      <View>
        <TelaPsicologa />
      </View>)
  }
  if (exibirTela && navegacao === 'Tela Historico') {
    // setexibirTela(false)
    return (
      <View>
        <Telahistorico />
      </View>)


  } else if (exibirTela && navegacao === 'Atendimento Especialista') {
    return (
      <View>
        <AtendimentoEspecialista />
      </View>
    )
  } else if (exibirTela && navegacao === 'reagendar') {
    return (
      <View>
        <Reagendamento data={reAgendar.data} horario={reAgendar.hora} id={reAgendar.id} id_especialista={reAgendar.id_especialista} servicoId={reAgendar.servicoId} />
      </View>
    )
  }


  //filter para os agendamentos recente

  function filtroDataRecente(itens, pageAtual, limitador) {
    // let data = moment().format('DD/MM/YYYY')
    let result = [];

    itens.sort((a, b) => moment(b.data).diff(moment(a.data)));

    let totalPage = Math.ceil(pageAtual * limitador / limitador);

    let count = (pageAtual * limitador) - limitador;

    let delimitador = count + limitador


    if (pageAtual <= totalPage) {
      for (let i = count; i < delimitador; i++) {
        if (itens[i] != null) {
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


  function nextPreviuos(value) {
    // console.log(value)
    let NovapageAtual = pageAtual + value;

    if (NovapageAtual > 0 && NovapageAtual <= Math.ceil(dados.length / limitador)) {
      setPageAtual(NovapageAtual)
    }
  }
  //dados filtrados e ordenados pelo mais recente
  const { resultado, totalPages } = filtroDataRecente(dados, pageAtual, limitador);

  async function exportToExcel() {
    try {
      if (resultado.length === 0) {
        console.log('Não há dados para exportar para o Excel.');
        return;
      }

      await util.ExportToExcel('pendentes', resultado);
    } catch (error) {
      console.log(error);
    }
  }

  //console.log(totalPages)

  async function cancelarAgenda(event) {

    await axios.delete(util.urlDeleteAgendamento + event, headers)
      .then((response) => {
        console.log(response)
        alert('Agendamento deletado com sucesso!')
        util.refrestPage();
      })
      .catch(() => alert("Erro ao deletar agendamento"), util.refrestPage())




  }
  function reagendar(event, tela) {
    alert('Tem certeza que deseja reagendar?')
    setReagendar(event)
    setnavegacao(tela)
    setexibirTela(true)
  }
 async function handleComparecimento(comparecimento){
    //console.log(comparecimento.target.value)
    //console.log(dados)
    alert('confirmar comparecimento?')

   await axios.put(urlPUTcomparecimento, {
      id: comparecimento.target.value,
      comparecimento: 1
    }).then(() => alert('Comparecimento confirmado!'))
    .catch((err) => alert(err))
    
  }

  const width = Dimensions.get('window').width

  
  const Card = ({ title, description }) => {
    const [expanded, setExpanded] = useState(false);
    let comp = description.comparecimento === '1' ? 'SIM' : 'NÃO CONFIRMADO';
    const styleM = width < 800 ? styles.infoContainerM : styles.infoContainer
    const handleCardPress = () => {
      setExpanded(!expanded);
    };
    if (!title && !description) {
      return (
        <>
          <ActivityIndicator size={100} />
          <Text>Nenhum agendamento pendente</Text>
        </>);
    }

    if (comp === 'SIM') {
      return (

        <TouchableOpacity id='*' onPress={handleCardPress}>
          <View style={styles.cardContainer}>
            <Text style={styles.title1}>{title}</Text>
            {expanded &&
              <View style={styles.descriptionContainer}>
                <View style={styleM}>
  
                  <View style={styles.infoAgendas}>
  
                    <Text style={styles.label}><Text style={{ fontStyle: 'normal', fontWeight: 'bold' }}>Horario:</Text> {moment(description.hora).format('HH:mm')}</Text>
                    <Text style={styles.label}><Text style={{ fontStyle: 'normal', fontWeight: 'bold' }}>Nome:</Text> {description.nome}</Text>
                    <Text style={styles.label} ><Text style={{ fontStyle: 'normal', fontWeight: 'bold' }}>Email:</Text> {description.email}</Text>
                    <Text style={styles.label} ><Text style={{ fontStyle: 'normal', fontWeight: 'bold' }}>Telefone:</Text> {description.telefone}</Text>
                    <Text style={styles.label} ><Text style={{ fontStyle: 'normal', fontWeight: 'bold' }}>Setor:</Text> {description.setor}</Text>
                    <Text style={styles.label} ><Text style={{ fontStyle: 'normal', fontWeight: 'bold' }}>Comparecimento:</Text> {comp}</Text>
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
                    <Text style={{ fontFamily: 'Harabara', fontSize: 20 }} >
                      <Feather name="trash-2" size={24} color="black" />
                      Cancelar
                    </Text>
  
                  </TouchableOpacity>
                  <TouchableOpacity id='#2' onPress={() => reagendar(description, 'reagendar')} style={{
                    borderWidth: 1,
  
                    borderColor: '#000',
                    borderRadius: 30,
                    padding: 10,
                    alignItems: 'center',
  
                  }}>
                    <Text style={{ fontFamily: 'Harabara', fontSize: 20 }}>
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
      
    } else {
      return (

        <TouchableOpacity id='*' onPress={handleCardPress}>
          <View style={styles.cardContainer}>
            <Text style={styles.title1}>{title}</Text>
            {expanded &&
              <View style={styles.descriptionContainer}>
                <View style={styleM}>
  
                  <View style={styles.infoAgendas}>
  
                    <Text style={styles.label}><Text style={{ fontStyle: 'normal', fontWeight: 'bold' }}>Horario:</Text> {moment(description.hora).format('HH:mm')}</Text>
                    <Text style={styles.label}><Text style={{ fontStyle: 'normal', fontWeight: 'bold' }}>Nome:</Text> {description.nome}</Text>
                    <Text style={styles.label} ><Text style={{ fontStyle: 'normal', fontWeight: 'bold' }}>Email:</Text> {description.email}</Text>
                    <Text style={styles.label} ><Text style={{ fontStyle: 'normal', fontWeight: 'bold' }}>Telefone:</Text> {description.telefone}</Text>
                    <Text style={styles.label} ><Text style={{ fontStyle: 'normal', fontWeight: 'bold' }}>Setor:</Text> {description.setor}</Text>
                    <Text style={styles.label} ><Text style={{ fontStyle: 'normal', fontWeight: 'bold' }}>Comparecimento:</Text> {comp}</Text>
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
                    <Text style={{ fontFamily: 'Harabara', fontSize: 20 }} >
                      <Feather name="trash-2" size={24} color="black" />
                      Cancelar
                    </Text>
  
                  </TouchableOpacity>
                  <TouchableOpacity id='#2' onPress={() => reagendar(description, 'reagendar')} style={{
                    borderWidth: 1,
  
                    borderColor: '#000',
                    borderRadius: 30,
                    padding: 10,
                    alignItems: 'center',
  
                  }}>
                    <Text style={{ fontFamily: 'Harabara', fontSize: 20 }}>
                      <FontAwesome name="send-o" size={24} color="black" />
                      Reagendar
                    </Text>
                  </TouchableOpacity>
  
                  <div style={{ width: 'auto', backgroundColor: 'white', display: 'inline-block', marginLeft: 30 }}>
                    <label>
                      <input type="checkbox" value={description.id} onChange={(e) => handleComparecimento(e)} />
                      comparecimento
                    </label>
                  </div>
  
                    
                </View>
              </View>
  
            }
            
          </View>
  
              
        </TouchableOpacity>
  
  
      );
    }
  };
