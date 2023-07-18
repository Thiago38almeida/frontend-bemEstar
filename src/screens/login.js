import React, { useState,useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Image} from 'react-native';
import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthProvider, { AuthContext } from '../contexts/auth';






const Login = () => {
    const [email, setEmail] = useState();
    const [senha, setPassword] = useState();

    const {SignIn} = useContext(AuthContext);

    function handledados (){
        SignIn(email, senha)
       
        
    }
    return (
      <View style={{flex: 1, width: '100%'}}>
          <View style={styles.container}>
            <Image source={require('../../assets/MicrosoftTeams-image (1).png')} style={{width: 150, height:150}}/>
           
            <View style={{marginTop: 20}}>
                
                <TextInput nativeID='email' style={styles.inputs} placeholder='email@exemplo.com....' onChangeText={(text) =>setEmail(text)}></TextInput>
                <TextInput nativeID='senha' style={styles.inputs} placeholder='SenhaDeExemplo123....' onChangeText={(text) => setPassword(text)}></TextInput>
                <Button title="enviar" onPress={handledados}></Button>
            </View>
        </View>
   
      </View>
    );
  };



    const styles = StyleSheet.create({
container: {
flex: 1,           
backgroundColor: '#fff',
alignItems: 'center',
justifyContent: 'center',
},
inputs: {
borderWidth: 1,
borderColor: 'black',
padding: 10,
marginBottom: 5,
borderRadius: 20
}

});

        export default Login;