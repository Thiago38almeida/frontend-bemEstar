import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import 'react-native-gesture-handler';


const HorariosDisponiveis = ({selectedHour}) => {
  const availableHours = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
  ];

  const [selectedHours, setSelectedHours] = useState([]);

  const handleHourSelection = (hour) => {
    if (selectedHours.includes(hour)) {
      setSelectedHours(selectedHours.filter((selectedHour) => selectedHour !== hour));

    } else {
      setSelectedHours([...selectedHours, hour]);
    }
  };
 


  return (
    <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1, flexDirection: 'row' }}>
  <View style={{flexDirection:'column'}}>
    <View>
    <View style={{ flexDirection: 'row' }}>
      {availableHours.slice(0, 6).map((hour) => (
        <TouchableOpacity
          key={hour}
          style={[
            styles.hourButton,
            selectedHours.includes(hour) && styles.selectedHourButton,
          ]}
          onPress={() => handleHourSelection(hour)}
        >
          <Text style={styles.hourButtonText}>{hour}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>

  <View>
    <View style={{ flexDirection: 'row' }}>
      {availableHours.slice(6).map((hour) => (
        <TouchableOpacity
          key={hour}
          style={[
            styles.hourButton,
            selectedHours.includes(hour) && styles.selectedHourButton,
          ]}
          onPress={() => handleHourSelection(hour)}
        >
          <Text style={styles.hourButtonText}>{hour}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
  </View>

  </ScrollView>

  );
};

export default HorariosDisponiveis;

const styles = StyleSheet.create({
  hourButton: {
    width: 80,
    height: 30,
    margin: 5,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedHourButton: {
    backgroundColor: 'lightblue',
  },
  hourButtonText: {
    fontSize: 12,
  },
});


