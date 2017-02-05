import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { routenplaner } from './routenplaner';

export default class Routenplaner extends Component {

	render() {
    const { duration, setMode } = this.props;

		return (
      <View style={routenplaner.container}>

        <TouchableOpacity
          onPress={() => setMode('walking')}>
          <MaterialIcons name="directions-walk" style={routenplaner.icon} />
          <Text style={routenplaner.duration}>{duration.walk}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setMode('bicycling')}>
          <MaterialIcons name="directions-bike" style={routenplaner.icon} />
          <Text style={routenplaner.duration}>{duration.bike}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setMode('transit')}>
          <MaterialIcons name="directions-transit" style={routenplaner.icon} />
          <Text style={routenplaner.duration}>{duration.transit}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setMode('driving')}>
          <MaterialIcons name="directions-car" style={routenplaner.icon} />
          <Text style={routenplaner.duration}>{duration.car}</Text>
        </TouchableOpacity>

      </View>
		)
	}
}

Routenplaner.propTypes = {
  duration: PropTypes.object.isRequired,
};
