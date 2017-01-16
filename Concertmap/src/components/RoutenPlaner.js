import React, { Component, PropTypes } from 'react';
import { View, Text, Linking } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { routenplaner } from '../styles/routenplaner';

export default class RoutenPlaner extends Component {

	render() {
  const band = 'Antilopengang';
  const city = 'Berlin';
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
          onPress={() => Linking.openURL(`http://www.ticketmaster.de/search/?keyword=${band}+${city}`)}>
          Ticket kaufen
        </Text>

      </View>
		)
	}
}

routenplaner.propTypes = {

};
