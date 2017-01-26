import React, { Component, PropTypes } from 'react';
import { BackAndroid, ScrollView, View, Text, Image, Linking } from 'react-native';
import MapView from 'react-native-maps';

import { detail } from './detail';
import { fonts } from '../../config/styles';
import images from '../../config/images';
import Routenplaner from '../Routenplaner';

export default class ListDetail extends Component {

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1) {
        this.props.navigator.pop();
        return true;
      }
      return false;
    });
  }

	render() {
		const { concert, navigator } = this.props;

    const routes = navigator.getCurrentRoutes(0);
    const prevRoute = routes[routes.length -2].title; // vorletzte

    return (
      <View style={detail.container}>
        <Text style={fonts.title}>
          {concert.title}
        </Text>
        <Text style={fonts.info}>
          {concert.releaseYear}
        </Text>

         <View style={detail.imageView}>
          <Image style={detail.image}
            source={images.pugtato}>
            <Routenplaner interpret={concert.title} city='Berlin'/>
          </Image>
        </View>

        <Text style={fonts.title}>
          8€ - Morgen 20:00 Uhr
        </Text>

        <Text style={fonts.importantInfo}>
          BrotFabrik
        </Text>
        <Text style={fonts.importantInfo}>
          HalliGalliplatz 1
        </Text>
        <Text style={fonts.importantInfo}>
          13087 Berlin
        </Text>

        <Text style={fonts.link}
          onPress={() => Linking.openURL('http://www.berliner-nachtgesang.de')}>
          http://www.berliner-nachtgesang.de
        </Text>

        { prevRoute === 'List' ?
        <Text style={fonts.info}>
            {'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.'}
          </Text>
          :
          <MapView
            style={detail.map}
            region={{
              latitude: 52.5451157,
              longitude: 13.355231799,
              latitudeDelta: 0.0055,
              longitudeDelta: 0.0055
            }}
            showsIndoors={false}
            loadingIndicatorColor='#008bae'>

          <MapView.Marker
            identifier={concert.title}
            key={concert.title}
            coordinate={{
                latitude: 52.5451157,
                longitude: 13.355231799
            }}
            title={concert.title}
            image={images.marker} />

         </MapView>
        }
      </View>
		)
	}
}

ListDetail.propTypes = {
  concert: PropTypes.object.isRequired
};
