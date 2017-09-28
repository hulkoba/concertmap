import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { routenplaner } from './routenplaner';

const propTypes = {
	duration: PropTypes.object.isRequired,
	setTravelMode: PropTypes.func.isRequired
};

const Routenplaner = ({ duration, setTravelMode }) => (
	<View style={routenplaner.container}>
		<TouchableOpacity onPress={() => setTravelMode('walking')}>
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
);

Routenplaner.propTypes = propTypes;
export default Routenplaner;
