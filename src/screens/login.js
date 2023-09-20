import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Button, TextInput, Image} from 'react-native';
import { AuthContext } from '../contexts/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const { SignIn, SignOUt } = useContext(AuthContext);

  useEffect(() => {
    document.title = 'Login';
  }, []);
  alert( document.title)
  //console.log(AuthContext.Provider)
  function handledados() {
    if (email && senha) {
      const userData = { email, senha };
      SignIn(email, senha);
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  function regexPassword(pass) {
    const regex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/; 
    /*
    Deve conter pelo menos um dígito (0 a 9).
    Deve conter pelo menos uma letra maiúscula (A a Z).
    Deve ter pelo menos 8 caracteres.
    */
    console.log(regex.test(pass))
    if (regex.test(pass)) {
      // Senha válida, pode prosseguir
      setPassword(pass);
    } 
  }

  return (
    <View style={styles.container}>
      <form style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
        <Image source={require('../../assets/MicrosoftTeams-image (1).png')} style={{ width: 300, height: 300 }} />
        <View style={{ marginTop: 20, justifyContent: 'center' }}>
          <TextInput
            nativeID='email'
            style={styles.inputs}
            placeholder='email@exemplo.com....'
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            nativeID='senha'
            style={styles.inputs}
            placeholder='SenhaDeExemplo123....'
            secureTextEntry={true} // Oculta a senha
            onChangeText={(text) => regexPassword(text)}
          />
          <Button title="enviar" onPress={handledados} />
        </View>
      </form>
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
