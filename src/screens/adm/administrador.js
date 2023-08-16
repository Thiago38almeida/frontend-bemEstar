import axios from 'axios';
import React, { useEffect, useState } from 'react';
import util from '../../util/util';
import './styles.css'
import { View } from 'react-native';

const AdminPanel = () => {

    const [dados, setDados] = useState([]);

  async  function fetch() {
    try{

    const res =  await axios.get(util.urlAdmin)
      setDados(res.data)
    }
    catch(err){
        console.log("Erro ao buscar os dados")
        }}
        useEffect(()=>{fetch()},[])
//console.log(dados)

    
  return (
  <body>
     <nav className='nav-center'>
      <h1>Admin Panel</h1>
        <table className='table'>
            <thead>
              <tr>
                <td>Nome</td>
                <td>Email</td>
                <td>especialidade</td>
              </tr>

            </thead>
              <View>
                {
                dados && dados.map((dado)=>(                    
                <>
                    <tr key={dado.id}>
                      <td>{dado.nome}</td>
                      <td>{dado.email}</td>
                      <td>{dado.especialidade}</td>
                    </tr>
                </>
                          )
                )}
              </View>
        </table>
    </nav>

  </body>
   

  );
};




export default AdminPanel;
