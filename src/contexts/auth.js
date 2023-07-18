import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
     const refreshPage = () => {
    window.location.reload();
  };

  const navigation = useNavigation();


  const url = "http://localhost:9091/bemEstar/login";

  async function SignIn(email, senha) {
    try {
      const data = { email, senha };
   
    const response = await axios.post(url, data);
  
      if (response.data) {
         
        AsyncStorage.setItem("token", response.data.token);
       localStorage.setItem('dados', JSON.stringify(response.data));
       

        if (response.data.status === '200') {
            //console.log(response.data.especialidade)
         const tela = response.data.telasRenderizada
         console.log(tela)
          navigation.reset({
            index: 0,
            routes: [{ name: tela }],

           
          });
        }
  
      }
    } catch (error) {
      console.log(error)
      alert("Usuário ou senha inválidos");
      refreshPage()
     
    }
  }
 

  return (
    <AuthContext.Provider value={{ SignIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
