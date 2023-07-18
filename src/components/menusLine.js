import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import TelaPsicologa from '../screensUsers/psicologa/psicologa';
import Telahistorico from '../screensUsers/psicologa/historico';

const Menu = () => {
  /*
  const [activeItem, setActiveItem] = useState(null);

  const handleMenuItemPress = (menuItem) => {
    setActiveItem(menuItem);
  };

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity
        style={[
          styles.menuItem,
          activeItem === 'Item 1' && styles.activeMenuItem,
        ]}
        onPress={() => handleMenuItemPress('Item 1')}
      >
        <Text
          style={[
            styles.menuItemText,
            activeItem === 'Item 1' && styles.activeMenuItemText,
          ]}
        >
          Item 1
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.menuItem,
          activeItem === 'Item 2' && styles.activeMenuItem,
        ]}
        onPress={() => handleMenuItemPress('Item 2')}
      >
        <Text
          style={[
            styles.menuItemText,
            activeItem === 'Item 2' && styles.activeMenuItemText,
          ]}
        >
          Item 2
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.menuItem,
          activeItem === 'Item 3' && styles.activeMenuItem,
        ]}
        onPress={() => handleMenuItemPress('Item 3')}
      >
        <Text
          style={[
            styles.menuItemText,
            activeItem === 'Item 3' && styles.activeMenuItemText,
          ]}
        >
          Item 3
        </Text>
      </TouchableOpacity>
    </View>
  );*/

  const [exibirTela, setexibirTela] = useState(false);
  const [navegacao, setnavegacao] = useState();

  
  const handleTelaPsicologa =  (event) => {
    console.log(event)
    setnavegacao(event)

   setexibirTela(true)
  
  
  }
  const handleTelaHistorico = (event) => {
   // console.log(event)
    setexibirTela(true)

    setnavegacao(event)

    
}

if(exibirTela && navegacao === 'handleTelaPsicologa'){
  return(
      <View>
          <TelaPsicologa />
      </View>
  )
} if(exibirTela && navegacao === 'handleTelaHistorico'){
  return(
    <View>
        <Telahistorico/>
      </View>
  )
}
return (
  <View style={styles.header}>
    <View style={styles.headerBtn}>
      <TouchableOpacity style={styles.btn} onPress={() =>handleTelaPsicologa('handleTelaPsicologa')}>
        <Text>Pendentes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => handleTelaHistorico('handleTelaHistorico')}>
        <Text>Histórico</Text>
      </TouchableOpacity>
      <View>
        <Text>nome</Text>
      </View>
    </View>
  </View>
)
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
  },
  menuItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  activeMenuItem: {
    backgroundColor: 'yellow',
  },
  activeMenuItemText: {
    color: 'red',
  },
  header: {
    width: '100%',
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'baseline',
     padding: 20,
     backgroundColor: 'white',
     borderRadius: 4,
 
 
 },
 headerBtn: {
  
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'baseline',
   textAlignVertical: 'bottom',
   flexWrap: 'wrap',
  },btn: {
     width: '100%',
     height: 50,
     flexWrap: 'wrap',
     alignItems: 'center',
     justifyContent: 'space-between',
     flex: 1,
     padding: 10,
     
 },
});

export default Menu;
