import React, { Component, PropTypes } from 'react';
import { View, Text, Linking } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { routenplaner } from '../styles/routenplaner';

export default class RoutenPlaner extends Component {

	render() {
    const { interpret, city } = this.props;

		return (
      <View style={routenplaner.container}>
        <View >
          <MaterialIcons name="directions-walk" style={routenplaner.icon} />
          <Text style={routenplaner.duration}> 11 min</Text>
        </View>

        <View >
          <MaterialIcons name="directions-transit" style={routenplaner.icon} />
          <Text style={routenplaner.duration}> 23 min</Text>
        </View>

        <View >
          <MaterialIcons name="directions-bike" style={routenplaner.icon} />
          <Text style={routenplaner.duration}> 6 min</Text>
        </View>

        <View >
          <MaterialIcons name="directions-car" style={routenplaner.icon} />
          <Text style={routenplaner.duration}> 41 min</Text>
        </View>

        <Text style={routenplaner.ticketButton}
          onPress={() => Linking.openURL(`http://www.ticketmaster.de/search/?keyword=${interpret}+${city}`)}>
          Ticket kaufen
        </Text>

      </View>
		)
	}
}

routenplaner.propTypes = {
  city: PropTypes.string.isRequired,
  interpret: PropTypes.string.isRequired,
};