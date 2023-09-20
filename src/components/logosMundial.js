import { Image, StyleSheet,View } from "react-native";



export default function LogoMundial() {
    return (
        <>
        <Image source={require('../../assets/logo_mundial_cores.png')} style={styles.logo} />
            <Image source={require('../../assets/MicrosoftTeams-image (1).png')} style={styles.logo2} />
        
        </>
            
    ) 
}

const styles = StyleSheet.create({
    logo: {
        //resizeMode:'contain',
        width: 100,
        height: 100,
        position: "absolute",
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        left: '9%',
        marginTop: -7,
        top: 7
  },
  logo2: {
    //resizeMode:'contain',
    width: 100,
    height: 100,
    position: "absolute",
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    left: '15%',
      marginTop: -7,
      top: 7
    
  },
})