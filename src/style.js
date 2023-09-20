const { StyleSheet } = require("react-native");

const styleWebMobileUsers = StyleSheet.create({
  
})

const styleWebMobile = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e77825',
        width: '60%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 30,
        margin: 30,
        flexDirection: 'column',
      }, 
      containerGrid: {
        flexDirection: 'row',
        backgroundColor: '#090707',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderRadius: 30,
        width: '98%',
        height: '98%',
        //maxWidth: 800,
      
        
      },
      Calendar: {
        width: '95%',
        height: '45%'
    
      },
    
    containerDate: {
      marginRight: 10,
      width:'50%',
      height: '50%',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 1,
      flexDirection: 'row',
      margin: 30
    },
    containerInfo: {
      alignItems: 'center',
      padding: 50,
      marginBottom: 10,
      borderRightColor: 'white',
      borderRightWidth: 1,
      width: '35%'
    },
    
    containerHeaderCalendario: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      height: 100,
    } ,
    textDate: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white',
      alignItems: 'center',
      textAlign: 'center'
    },
    textDateh: {
      fontSize: 12,
      color: 'white',
      marginTop: 10
    },
    containerHorario: {
      alignItems: 'center',
      maxHeight: 350,
     
    
    },
    ScrollContainer: {
      paddingVertical: 20,
      color: 'black',
    
    },
    containerHorariosDisponiveis: {
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
    horarioContainer: {
      marginRight: 10,
      marginBottom: 10,
      alignItems: 'center',
      
    
    },
    btnHorario: {
      fontFamily: 'sans-serif',
      color: 'white',
      padding: 6,
      borderColor: '#e77825',
      borderWidth: 1
    
    },
    
    heading: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      color: 'white'
      
    
    },
    datas: {
        color: 'blue'
      },
    
      horarios: {
      color: 'black',
      fontSize: 20,
      borderWidth: 1,
      borderColor: 'blue',
      padding: 20,
      marginBottom: 5,
      textAlign: 'center',
      flexDirection: 'column',
      },
      containerHorarios: {
        width: '100%',
        color: 'black',
        fontSize: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: 'black',
        fontWeight: 'bold',
        flexWrap: 'wrap',
        flex:1,
        marginTop: 5,
        marginBottom: 5
       
    
      },
    
      textHorariosSelecionado: {
      borderWidth: 1,
      borderColor: 'black',
      padding: 20,
      marginBottom: 5,
      textAlign: 'center',
    
      },
      textHorarios: {
      borderWidth: 1,
      borderColor: 'blue',
      padding: 20,
      marginBottom: 5,
      textAlign: 'center',   
        
      },
      containerButton: {
      marginTop: 20,
      alignItems: 'center',
      },
//Mobile
containerM: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e77825',
    width: '90%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 30,
    margin: 30,
    flexDirection: 'column',
  }, 
  containerGridM: {
    flexDirection: 'column',
    backgroundColor: '#090707',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 30,
    width: '95%',
    height: '98%',
   // Width: '98%',
  
    
  },
 Calendar: {
    width: '95%',
    height: '45%'

  },

containerDate: {
  marginRight: 10,
  width:'50%',
  height: '50%',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: 1,
  flexDirection: 'row',
  margin: 30
},
containerInfoM: {
  alignItems: 'center',
  padding: 50,
  marginBottom: 10,
  borderBottomColor: 'white',
  borderBottomWidth: 1,
  width: '95%'
},
btnHorarioM: {
    alignSelf: "flex-end",
    width: 200 ,
    height: 50,
    padding: 8,
    alignItems: 'center',
    borderColor: '#e77825',
    borderWidth: 1
},

// formsAgendamento

containerInput: {
  justifyContent: 'center',
  alignItems: 'center'

},
containerInputM: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow : 1

},
inputBtnM: {
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center'
},
input: {
    backgroundColor: "#f3f4fa",
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 20,
    width: '100%'
},
button: {
    flexDirection: 'row',
    margin: 5
}




    });


module.exports = styleWebMobile;
//module.exports = styleWebMobileUsers;
  