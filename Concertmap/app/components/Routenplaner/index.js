import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { routenplaner } from './routenplaner';
import settings from '../../config/settings';

export default class Routenplaner extends Component {

	render() {
    const { duration } = this.props;

		return (
      <View style={routenplaner.container}>

        <View >
          <MaterialIcons name="directions-walk" style={routenplaner.icon} />
          <Text style={routenplaner.duration}>{duration.walk}</Text>
        </View>

        <View >
          <MaterialIcons name="directions-bike" style={routenplaner.icon} />
          <Text style={routenplaner.duration}>{duration.bike}</Text>
        </View>

        <View >
          <MaterialIcons name="directions-transit" style={routenplaner.icon} />
          <Text style={routenplaner.duration}>{duration.metro}</Text>
        </View>

        <View >
          <MaterialIcons name="directions-car" style={routenplaner.icon} />
          <Text style={routenplaner.duration}>{duration.car}</Text>
        </View>

      </View>
		)
	}
}

Routenplaner.propTypes = {
  duration: PropTypes.object.isRequired,
};
