
import { FontAwesome5 } from '@expo/vector-icons';
import { Router, useRoute, useNavigation } from '@react-navigation/native';

import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Pressable } from 'react-native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleCardPress = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <>
   
    
      <View style={styles.header}>
        <View style={styles.login}>
          <Pressable  onPress={() => navigation.navigate('Login')}>
          <FontAwesome5 name="user" size={40}/> 
          <Text>Entrar</Text>        

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
        <Text style={styles.cardTitle}>Massoterapeuta Neolog</Text>
        <Text style={styles.cardDescription}>Veja as últimas atualizações da Achelog.</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => handleCardPress('massoterapiaMatrix')}
      >
        <Text style={styles.cardTitle}>Massoterapeuta Matrix</Text>
        <Text style={styles.cardDescription}>Acesse a Matrix para visualizar dados.</Text>
      </TouchableOpacity>
    
    </View>
    

    </>
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
    fontFamily: 'Keypass Demo',
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
  login: {
    position: 'absolute',
    top: 0,
    right: 100,
    margin: 10,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Keypass Demo',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    color: 'gray',
    fontFamily: 'Keypass Demo',
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
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Keypass Demo',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardTime: {
    fontSize: 14,
    fontFamily: 'Keypass Demo',
    color: '#888',
  },

});


