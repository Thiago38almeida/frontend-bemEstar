import React, {useEffect, useRef, useState} from 'react';
import { Text, View, StyleSheet,Image, Button,TextInput, TouchableOpacity, FlatList, Alert, Pressable } from 'react-native';
import moment from 'moment/moment';
import axios from  'axios';
import util from '../util/util';


export function Card({ data ,setNull}) {
    const [editedData, setEditedData] = useState([]);
    const [edit, setEdit] = useState(null);
    const [expandedIndex, setExpandedIndex] = useState(-1);


    const dadosArmazenados = sessionStorage.getItem('dados');
    const dadosLogados = JSON.parse(dadosArmazenados);

    
const config ={
  headers: {
  'authorization': `Bearer ${dadosLogados.token}`
}
}


    const ref = useRef();
  
    useEffect(() => {
      if(data.length > 0){
      setEditedData(data.map(horario => ({ ...horario, editMode: false })));
    }}, [data]);
  
    const handleEdit = (text, index, field) => {

     const newData = [...editedData];
        
      newData[index][field] = text;
      setEditedData(newData);

      //handleSave();
  
    };

  // console.log(editedData)
  
    const handleSave = async (inicio, fim, dias, id) => {

   //  console.log(inicio, fim, dias, id)

     
      const dados = {
        inicio,
        fim,
        dias,
        id,
        especialidade: dadosLogados.especialidade,
        servicoId: dadosLogados.user
      }

      try {
        await axios.put(util.urlPUThorarioFuncio, dados,config)
//console.log(dados, editedData)
        alert('Horário Alterado!')
      } catch (error) {
        console.log(error)
        alert('Ocorreu um erro', error)
        
        
      }
      
     // console.log(editedData)
    };
 //console.log(moment(horario.dias).locale('pt-br').format('ddd').toLocaleUpperCase()) 
    return (
      <View ref={ref} style={{justifyContent:'center', alignItems:'center'}} >
        <Text style={styles.cardTitle}>Horarios de Atendimento</Text>
       
          <Pressable onChange={() => util.refrestPage()}><Text>Atualizar dados</Text></Pressable>
            <View style={styles.cardContainer}>
            {editedData.map((horario, index) => (
              
                    <View key={index} style={styles.editableItem}>
                      <TouchableOpacity
                        style={styles.cardHeader}
                        onPress={() => setExpandedIndex(index === expandedIndex ? -1 : index)}
                      >
                        <Text style={styles.label}>
                          {moment().weekday(horario.dias).locale('pt-br').format('ddd').toLocaleUpperCase()}:
                        </Text>
                      </TouchableOpacity>
                      {index === expandedIndex && (
                        <View style={styles.expandedContent}>
                          {!horario.editMode ? (
                            <>
                              <TextInput
                                style={styles.input}
                                value={horario.inicio}
                                autoFocus={true}
                              />
                              <TextInput
                                style={styles.input}
                                value={horario.fim}
                              />
                              <Button
                                title='Editar'
                                onPress={() => setEdit(horario.editMode = true)}
                              />
                            </>
                          ) : (
                            <>
                              <TextInput
                                style={styles.input}
                                value={horario.inicio}
                                onChangeText={(text) => handleEdit(text, index, 'inicio')}
                              />
                              <TextInput
                                style={styles.input}
                                value={horario.fim}
                                onChangeText={(text) => handleEdit(text, index, 'fim')}
                              />
                              <Button
                                title='cancelar'
                                color='orange'
                                onPress={() => setEdit(horario.editMode = false)}
                              />

                            <Button title='Alterar horarios'  onPress={() => handleSave(horario.inicio, horario.fim, horario.dias, horario.id)} color={'orange'}/>

                            </>
                          )}
                        </View>
                      )}

                    </View>
                    ))}
            
          </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    cardHeader: {
    //  flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: '#e77825',
      borderRadius: 5,
      marginBottom: 8,
    },
    title: {
      fontSize: 100,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    expandedContent: {
      paddingTop: 10,
      paddingHorizontal: 16,
      paddingBottom: 8,
      borderWidth: 1,
      borderColor: 'orange',
     // flexDirection: 'row',
    },
    cardContainer: {
      flexDirection: 'row',
      backgroundColor: '#f9f9f9',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
    },
    cardTitle: {

fontSize: 22, 
alignItems: 'center', 
fontFamily: 'Harabara',     
     // width: 250,
      padding: 10,
      borderRadius: 10,
      marginBottom: 8,
    },
    editableItem: {
    //  flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
      


    },
    label: {
     // fontSize: 30,
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