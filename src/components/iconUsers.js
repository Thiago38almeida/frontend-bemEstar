import { Feather,FontAwesome,FontAwesome5  } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {View, Text,TouchableOpacity, Pressable} from 'react-native';
import { StyleSheet } from 'react-native';
import util from '../util/util';


const UserIcon = () => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoggedIn, setisLoggedIn] = useState(false);

    const navigation = useNavigation();  


    const tokeen = sessionStorage.getItem('token')
    
    useEffect(() => {
      if(tokeen != '' ||  null){

      setisLoggedIn(true);
     }else{
       alert("Você precisa logar primeiro!");

     setisLoggedIn(false);

     }

    }, [tokeen])


    const handleExpand = () => {
      setIsExpanded(!isExpanded);
    };
    //const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
      navigation.navigate('Login')};
  
    
  
    const handleSair = async () => {
      try{
        
      await axios.post(util.urllogout)
        setisLoggedIn(false);
        navigation.navigate('Home');
      } catch (error) {
        console.log('erro:', error);
        sessionStorage.removeItem('dados');
        navigation.navigate('Home');

      }
   
    
    };
    
    return (
        <View >
            <TouchableOpacity onPress={handleExpand}>
        
          <FontAwesome5 name="user-circle" size={50} color="black" />
        
    
        {isExpanded && (
        <View style={[style.containerUser, { marginTop: 60 }]}>
        {!isLoggedIn ? (
          <Pressable onPress={handleLogin}>
            <Text>Entrar</Text>
          </Pressable>
        ) : (
          <Pressable onPress={() => handleSair()}>
            <Text>Sair</Text>
          </Pressable>
        )}
      </View>
        )}
      </TouchableOpacity>
      </View>
    );
    
}
const style = StyleSheet.create({
    containerUser: {
        position: 'absolute',
        backgroundColor:'gray',
        width:150,
        height:200,
        padding: 20,
        alignItems: 'flex-start',
        
        },

})

export default UserIcon;