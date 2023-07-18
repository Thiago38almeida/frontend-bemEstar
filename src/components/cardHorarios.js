import React, {useEffect, useRef, useState} from 'react';
import { Text, View, StyleSheet,Image, Button,ActivityIndicator,TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import moment from 'moment/moment';
import {Calendar,LocaleConfig} from 'react-native-calendars';
import axios from  'axios';
import { useNavigation } from '@react-navigation/native';
import { refrestPage } from '../util/util';
import util from '../util/util';


export function Card({ data ,setNull}) {
    const [editedData, setEditedData] = useState([]);
    const [edit, setEdit] = useState(null);
    const [expandedIndex, setExpandedIndex] = useState(-1);
    const dadosArmazenados = localStorage.getItem('dados');
    const dadosLogados = JSON.parse(dadosArmazenados);


   // console.log(dadosLogados.match())
      //console.log("Token:",Asyncstorage.getItem('token'))
      //console.log(`Nome do usuario logado ${JSON.parse(dadosLogados[


    
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

      console.log(text, index)
       
      const newData = [...editedData];
        
      newData[index][field] = text;
      setEditedData(newData);
      
      console.log(editedData)
    };
  
    const handleSave = async () => {

      try {
        await axios.put(util.urlPUThorarioFuncio, editedData,config)
      } catch (error) {
        console.log(error)
        alert('Ocorreu um erro', error)
        util.refrestPage()
        
      }
     // console.log(editedData)
    };
 //console.log(moment(horario.dias).locale('pt-br').format('ddd').toLocaleUpperCase()) 
    return (
      <View ref={ref} style={{justifyContent:'center', alignItems:'center'}} >
        <Text style={styles.cardTitle}>DIAS CADASTRADOS</Text>
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
                                title='Salvar'
                                color='orange'
                                onPress={() => setEdit(horario.editMode = false)}
                              />
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
      paddingHorizontal: 16,
      paddingBottom: 8,
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
      fontSize: 18,
      alignItems: 'center',
      alignContent: 'center',
     
     // width: 250,
      padding: 10,
      borderRadius: 10,
      marginBottom: 8,
    },
    editableItem: {
    //  flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
      borderWidth: 1,
      borderColor: 'orange',


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