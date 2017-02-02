import React, { Component, PropTypes } from 'react';
import { BackAndroid, ScrollView, View, Text, Image, Linking } from 'react-native';
import MapView from 'react-native-maps';


import { detail } from './detail';
import { fonts } from '../../config/styles';
import { settings } from '../../config/settings';
import { getDirection, createRouteCoordinates, getDuration } from '../../utils/map-utils';
import images from '../../config/images';
import Routenplaner from '../Routenplaner';
import Player from '../Player';

export default class Detail extends Component {

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1) {
        this.props.navigator.pop();
        return true;
      }
      return false;
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      polylineCoords: [],
      duration: {}
    }
  }

  componentDidMount() {
    getDirection(this.props.region, this.props.concert.position)
      .then((response) => {
        this.setState({polylineCoords: createRouteCoordinates(response)})
      });

    const duration = {};
    getDuration(this.props.region, this.props.concert.position)
      .then((response) => {
        duration.car = response.duration.text;
        duration.distance = response.distance.text
        return duration;
      })
      .then((duration) => {
        getDuration(this.props.region, this.props.concert.position, 'walking')
          .then((response) => {
            duration.walk = response.duration.text;
            return duration;
          })
          .then((duration) => {
          getDuration(this.props.region, this.props.concert.position, 'bicycling')
            .then((response) => {
              duration.bike = response.duration.text;
              this.setState({duration});
              return duration;
            })
/*            .then((duration) => {
                getDuration(this.props.region, this.props.concert.position, 'transit')
                .then((response) => {
                  if(response) {
                    duration.bike = response;
                  }
                  this.setState({durations: duration});
                })
          })*/
      })
    })
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
              duration={this.state.duration}
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
            <Text style={fonts.info}>
              {this.state.duration.distance}
            </Text>
          </View>

        </View>

        <Text style={fonts.link}
          onPress={() => Linking.openURL(`${concert.uri}`)}>
          {concert.uri}
        </Text>

        <MapView
          style={detail.map}
          region={{
            latitude: concert.position.lat,
            longitude: concert.position.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
          showsCompass={false}
          showsTraffic={false}
          showsBuildings={false}
          pitchEnabled={false}
          toolbarEnabled={false}
          >

          <MapView.Marker
            identifier={concert.title}
            key={concert.id}
            coordinate={{
                latitude: concert.position.lat,
                longitude: concert.position.lng,
            }}
            title={concert.title}
            image={images.marker} />
            <MapView.Polyline
              coordinates={this.state.polylineCoords}
              strokeWidth={2}
              strokeColor="magenta"
             />
         </MapView>
      </View>
		)
	}
}

Detail.propTypes = {
  concert: PropTypes.object.isRequired,
  region: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};
