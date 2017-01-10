import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';
import MapView from 'react-native-maps';

import { mapStyles } from '../styles/mapStyles';
import ActiveFilter from './ActiveFilter';

export default class ConcertMap extends Component {

	render() {
		const { concerts, filter, region } = this.props;

     /* const movies = responseJson.movies;
      movies.map(movie => (
        {...movie},
        latLng: {
          latitude: 52.5451157,
          longitude: 13.355231799,
        }));
      alert(JSON.stringify(movies[0]));*/
		return (
			<View style={mapStyles.container}>
				<ActiveFilter filter={filter} />

				<MapView
         style={mapStyles.map}
         region={region}
         showsIndoors={false}
         cacheEnabled={true}
         //loadingEnabled={true}
         showsUserLocation={true}
         followUserLocation={true}
         showsScale={true}
         loadingIndicatorColor='#008bae'
       >
       {concerts.map(concert => (
         <MapView.Marker
            key={concert.title}
            coordinate={{
                latitude: 52.5451157,
                longitude: 13.355231799
            }}
            title={concert.title}
            image={require('../img/marker.png')}
            />
       ))}
       </MapView>
			</View>
		)
	}
}


ConcertMap.propTypes = {
  concerts: PropTypes.array.isRequired,
};