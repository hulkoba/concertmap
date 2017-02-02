import React, { Component, PropTypes } from 'react';
import { BackAndroid, View, Text, Image } from 'react-native';
import MapView from 'react-native-maps';

import { map } from './mapStyles';
import images from '../../config/images';

export default class ConcertMap extends Component {

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1) {
        this.props.navigator.pop();
        return true;
      }
      return false;
    });
  }

  onMarkerPress(concert) {
    this.props.navigator.push({
      title: 'Detail',
      index: 2,
      data: concert
    });
  }

	render() {
		const { concerts, region } = this.props;

		return (
			<View style={map.container}>

				<MapView
					style={map.map}
					region={region}
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
                  image={images.marker}
                onPress={() => this.onMarkerPress(concert)} />
           ))}
         </MapView>
			</View>
		)
	}
}

ConcertMap.propTypes = {
  concerts: PropTypes.array.isRequired,
  region: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};
