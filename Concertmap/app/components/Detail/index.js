import React, { Component, PropTypes } from 'react';
import { BackAndroid, ScrollView, View, Text, Image, Linking } from 'react-native';
import MapView from 'react-native-maps';

import { detail } from './detail';
import { fonts } from '../../config/styles';
import images from '../../config/images';
import Routenplaner from '../Routenplaner';
import Player from '../Player';

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
		const { concert, region, navigator } = this.props;

    const routes = navigator.getCurrentRoutes(0);
    const prevRoute = routes[routes.length -2].title; // vorletzte

    return (
      <View style={detail.container}>
        <Text style={fonts.title}>
          {concert.title}
        </Text>
        <Text style={fonts.info}>
          {concert.venue}
        </Text>

         <View style={detail.imageView}>
          <Image style={detail.image}
            source={{uri: concert.image}}>
            <Routenplaner
              interpret={concert.title}
              city={concert.city}/>
          </Image>
        </View>

        <Text style={fonts.title}>
          {concert.datetime}
        </Text>

        <View style={detail.row}>
          <View style={detail.address}>
            <Text style={fonts.importantInfo}>
              {concert.venue}
            </Text>
            <Text style={fonts.importantInfo}>
               {concert.city}
            </Text>
          </View>
          <Player />
        </View>

        <Text style={fonts.link}
          onPress={() => Linking.openURL(`${concert.uri}`)}>
          {concert.uri}
        </Text>

        { prevRoute === 'List' ?
        <ScrollView >
          <Text style={fonts.info}>
              {'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.'}
            </Text>
          </ScrollView>
          :
          <MapView
            style={detail.map}
            region={{
              latitude: concert.position.lat,
              longitude: concert.position.lng,
              latitudeDelta: 0.0055,
              longitudeDelta: 0.0055
            }}
            showsIndoors={false}
            loadingIndicatorColor='#008bae'>

          <MapView.Marker
            identifier={concert.displayName}
            key={concert.displayName}
            coordinate={{
                latitude: concert.position.lat,
                longitude: concert.position.lng,
            }}
            title={concert.displayName}
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
