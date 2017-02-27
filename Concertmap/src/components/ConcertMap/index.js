import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';
import MapView from 'react-native-maps';

import { map } from './mapStyles';
import { marker } from '../../config/images';

export default class ConcertMap extends Component {

  constructor(props) {
    super(props);
    this.onMarkerPress = this.onMarkerPress.bind(this);
  }

  onMarkerPress(concert, region) {
    this.props.navigation.navigate('Detail', {
      concert, region
    });
  }

	render() {
		const { concerts, region } = this.props.screenProps;
    const dist = concerts[0].distance * 0.03;

		return (
			<View style={map.container}>

				<MapView
					style={map.map}
					region={{
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: dist,
            longitudeDelta: dist
          }}
					showsIndoors={false}
					showsUserLocation={true}
					followUserLocation={true}
					showsScale={true}
					loadingIndicatorColor='#008bae'	>

            {concerts.map(concert => (
             <MapView.Marker
                identifier={concert.title}
                key={concert.id}
                coordinate={{
                    latitude: concert.position.lat,
                    longitude: concert.position.lng
                }}
                title={concert.title}
                image={marker}
                onPress={() => this.onMarkerPress(concert, region)} />
           ))}
         </MapView>
			</View>
		)
	}
}

ConcertMap.propTypes = {
  screenProps: React.PropTypes.shape({
    concerts: PropTypes.array.isRequired,
    region: PropTypes.object.isRequired,
  }),
};
