import React, { PropTypes } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { routenplaner } from './routenplaner';

const Routenplaner = ({ duration, setTravelMode }) => (
  <View style={routenplaner.container}>

    <TouchableOpacity
      onPress={() => setTravelMode('walking')}>
      <MaterialIcons name="directions-walk" style={routenplaner.icon} />
      <Text style={routenplaner.duration}>{duration.walk}</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => setTravelMode('bicycling')}>
      <MaterialIcons name="directions-bike" style={routenplaner.icon} />
      <Text style={routenplaner.duration}>{duration.bike}</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => setTravelMode('transit')}>
      <MaterialIcons name="directions-transit" style={routenplaner.icon} />
      <Text style={routenplaner.duration}>{duration.transit}</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => setTravelMode('driving')}>
      <MaterialIcons name="directions-car" style={routenplaner.icon} />
      <Text style={routenplaner.duration}>{duration.car}</Text>
    </TouchableOpacity>

  </View>
)

Routenplaner.propTypes = {
  duration: PropTypes.object.isRequired,
  setTravelMode: PropTypes.func.isRequired,
};

export default Routenplaner;