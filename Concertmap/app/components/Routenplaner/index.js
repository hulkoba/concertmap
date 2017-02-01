import React, { Component, PropTypes } from 'react';
import { View, Text, Linking } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { routenplaner } from './routenplaner';
import settings from '../../config/settings';

export default class Routenplaner extends Component {

	render() {
    const { interpret, city, duration } = this.props;

		return (
      <View style={routenplaner.container}>
        <View >
          <MaterialIcons name="directions-walk" style={routenplaner.icon} />
          <Text style={routenplaner.duration}>{duration.walk}</Text>
        </View>

        <View >
          <MaterialIcons name="directions-transit" style={routenplaner.icon} />
          <Text style={routenplaner.duration}> 23 min</Text>
        </View>

        <View >
          <MaterialIcons name="directions-bike" style={routenplaner.icon} />
          <Text style={routenplaner.duration}>{duration.bike}</Text>
        </View>

        <View >
          <MaterialIcons name="directions-car" style={routenplaner.icon} />
          <Text style={routenplaner.duration}>{duration.car}</Text>
        </View>

        <Text style={routenplaner.ticketButton}
          onPress={() => Linking.openURL(`${settings.TICKETMASTER_URL}${interpret}+${city}`)}>
          Ticket kaufen
        </Text>

      </View>
		)
	}
}

Routenplaner.propTypes = {
  city: PropTypes.string.isRequired,
  duration: PropTypes.object.isRequired,
  interpret: PropTypes.string.isRequired,
};
