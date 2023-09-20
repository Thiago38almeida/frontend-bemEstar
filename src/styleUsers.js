const { StyleSheet } = require("react-native");

const styleWebMobileUsers = StyleSheet.create({
    container:
    {       
      width: '100%',
      backgroundColor: '#ffff',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50,
 },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 4,
      width: '100%',
      
    },
    logo: {
      //resizeMode:'contain',
      width: 100,
      height: 100,
      position: "absolute",
      justifyContent: 'flex-start',
      alignContent: 'flex-start',
      left: '9%',
      marginTop: -15
},
logo2: {
  //resizeMode:'contain',
  width: 100,
  height: 100,
  position: "absolute",
  justifyContent: 'flex-start',
  alignContent: 'flex-start',
  left: '15%',
    marginTop: -15
  
},
    headerBtn: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      top: 25,
      minWidth: 370
     // flexWrap: 'wrap',
     // maxwidth: 600,
     // backgroundColor: 'red'
    },
    btn: {
     //flex: 1,
    // width: '33.3%',
      height: 25,
      alignItems: 'center',
      justifyContent: 'center',
     padding: 10,
      marginBottom: 10,
    },
    btnNextPrev:{
      flex: 1,
      justifyContent:"space-evenly",
      alignItems: 'center',
      maxWidth: 75,
      
    },
    grid: {
    
      width:'100%',
      maxWidth:900,
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginRight: 'auto',
      marginLeft: 'auto',
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 20,
      marginTop: 10,
      
      },
      infoContainer: {
       flexDirection: 'row',
       alignItems: 'center',
        marginBottom: 10,
        flexWrap: 'wrap'
      },
      infoContainerM: {
        //flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
        flexWrap: 'wrap',
        //backgroundColor:'red'
      },
      label: {
       
        marginRight: 5,
      },
      
  card: {
    margin: 5,
    backgroundColor: 'white',
    
      },
  item: {
    width: '100%',
    height: 80,
  backgroundColor: '#f9c2ff',
          marginVertical: 8,
          marginHorizontal: 16,
          flexDirection: 'row',
        },
  cardContainer: {
          borderWidth: 1,
          borderColor: '#e77825',
          padding: 10,
          marginBottom: 10,
          borderRadius: 15,
          flexWrap: 'wrap',
          
         
        },
  descriptionContainer: {
          flexDirection: 'row',
          padding: 20,
          margin: 10,
  
        },
  title1: {
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 5,
        },
  description: {
          fontSize: 14,
          color: 'gray',
          flexWrap: 'wrap',
          padding: 5
         
        },
  text: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    justifyContent:  'space-between',
    padding: 20,
  
  }
})


module.exports = styleWebMobileUsers;
//module.exports = styleWebMobileUsers;
  