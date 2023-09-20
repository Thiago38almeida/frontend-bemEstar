
import { FontAwesome5 } from '@expo/vector-icons';
import { Router, useRoute, useNavigation, Link } from '@react-navigation/native';

import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Pressable } from 'react-native';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const navigation = useNavigate();

  const handleCardPress = (screenName) => {
   
    navigation(screenName);
  };

  return (
    <View style={{backgroundColor: '#eeeeec',  flex:1}}>
   
    
      <View style={styles.header}>
        <View style={styles.login}>
          <Pressable  onPress={() => navigation('Login')}>
          <FontAwesome5 name="user" size={40}/> 
          <Text style={{ fontFamily: 'Harabara'}}>Entrar</Text>        

          </Pressable>

        </View>
      
        <View><Image source={require('../../assets/MicrosoftTeams-image (1).png')} style={{width: 150, height:150, marginBottom: 10}}/></View>
        <Text style={styles.title}>Agendamento Bem Estar</Text>

        <View>
          
    
        </View>
        
      </View>
            <View style={styles.subtitle}>
                  <Text style={styles.heading}>Bem-vindo à Tela de Home</Text>
                  <Text style={styles.subheading}>Escolha uma opção:</Text>
            </View>
     
      <View style={styles.cards}>
      
      
     
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleCardPress('psicologaMatriz')}
      >
        <Text style={styles.cardTitle}>Psicóloga Matriz</Text>
        <Text style={styles.cardDescription}>Agende uma consulta com a psicóloga na Matriz.</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => handleCardPress('psicologaGLP')}
      >
        <Text style={styles.cardTitle}>Psicóloga GLP</Text>
        <Text style={styles.cardDescription}>Agende uma consulta com a psicóloga no GLP.</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => handleCardPress('massoterapiaGLP')}
      >
        <Text style={styles.cardTitle}>Massoterapia Neolog</Text>
        <Text style={styles.cardDescription}>Agende uma consulta com a Massoterapia no GLP.</Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => handleCardPress('massoterapiaMatriz')}
      >
        <Text style={styles.cardTitle}>Massoterapia Matriz</Text>
        <Text style={styles.cardDescription}>Agende uma consulta com a Massoterapia na Matriz.</Text>

      </TouchableOpacity>
    
    </View>
    

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cards: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  heading: {
    marginTop: 30,
    color: 'black',
    fontFamily: 'Harabara',
    fontSize: 20,
    fontWeight: 'bold'

  },
  header: {
    
    maxheight: 250,
    alignItems: 'center',
    justifyContent: 'top',
    padding: 16,
    backgroundColor: 'white',
    alignSelf: 'stretch',

    

  },
  subheading: {
    fontFamily: 'source sans pro'
  },
  login: {
    position: 'absolute',
    top: 0,
    right: '10%',
    margin: 10,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Harabara',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    color: 'gray',
    marginBottom: 16,
    textAlign: 'center'
  },
  
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minWidth: 300,
    maxWidth: 300,
    minHeight: 70,
    maxHeight: 100,
    
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Harabara',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    fontFamily: 'source sans pro',
    color: 'black',
  },

});


