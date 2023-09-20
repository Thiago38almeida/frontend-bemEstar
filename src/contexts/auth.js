import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import util from "../util/util";
import { useNavigate } from "react-router-dom";

 export const AuthContext = createContext({});

function AuthProvider({ children }) {
     const refreshPage = () => {
    window.location.reload();
  };

 // const navigation = useNavigate();


 

    async function SignIn({email, senha}) {
    try {
      const data = { email, senha };
   
    const response = await axios.post(util.urllogin, data);
  //console.log(response)
      if (response.data) {
         
       
       sessionStorage.setItem('dados', JSON.stringify(response.data));
       

        if (response.data.status === '200') {
            //console.log(response.data.especialidade)
         const tela = response.data.telasRenderizada
   // console.log(tela)
        
         navigation(tela)
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
