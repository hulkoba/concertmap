import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';
import MapView from 'react-native-maps';

import { mapStyles } from '../styles/mapStyles';

export default class ConcertMap extends Component {
	static get defaultProps() {
		return {
			title: 'Map'
		};
	}

	render() {
		const { concerts, region } = this.props;
		return (
			<View style={mapStyles.container}>
				<MapView
         style={mapStyles.map}
         region={{
           latitude: 47.78825,
           longitude: 52.4324,
           latitudeDelta: 0.015,
           longitudeDelta: 0.0121,
         }}
       >
       </MapView>
			</View>
		)
	}
}


ConcertMap.propTypes = {
  concerts: PropTypes.array.isRequired,
};