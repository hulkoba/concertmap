import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';
import MapView from 'react-native-maps';

import { map } from '../styles/mapStyles';
import FilterBar from './FilterBar';

export default class ConcertMap extends Component {

  onMarkerPress(marker) {
    alert(JSON.stringify(marker));
  }

	render() {
		const { concerts, filter, region } = this.props;

		return (
			<View style={map.container}>
				<FilterBar filter={filter} />

				<MapView
					style={map.map}
					region={region}
					showsIndoors={false}
					showsUserLocation={true}
					followUserLocation={true}
					showsScale={true}
					loadingIndicatorColor='#008bae'
       	>
       {concerts.map(concert => (
         <MapView.Marker
            identifier={concert.title}
            key={concert.title}
            coordinate={{
                latitude: 52.5451157,
                longitude: 13.355231799
            }}
            title={concert.title}
            image={require('../../img/marker.png')}
            onPress={() => this.onMarkerPress(concert)}
            />
       ))}
       </MapView>
			</View>
		)
	}
}

ConcertMap.propTypes = {
  concerts: PropTypes.array.isRequired,
  region: PropTypes.object.isRequired,
};
