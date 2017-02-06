import React, { Component, PropTypes } from 'react';
import { BackAndroid, ScrollView, View, Text, Image, Linking } from 'react-native';
import MapView from 'react-native-maps';


import { detail } from './detail';
import { fonts } from '../../config/styles';
import { TICKETMASTER_URL } from '../../config/settings';
import { getRouteCoordinates } from '../../utils/map-utils';
import { getVenueDetails, getDuration, getDirection } from '../../utils/api';

import images from '../../config/images';
import Routenplaner from '../Routenplaner';
import Play from '../Player';

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
    this.setMode = this.setMode.bind(this);
    this.state = {
      polylineCoords: [],
      mode: 'driving',
      duration: {
        distance: {}
      },
      venueLink: '',
      street: '',
      zip: ''
    }
  }

  componentDidMount() {

    getVenueDetails(this.props.concert.venueId).then((details) => {
      this.setState({
        street: details.street,
        venueLink: details.venueLink,
        zip: details.zip
      });
    });

    getDirection(this.props.region, this.props.concert.position)
      .then((response) => {
        this.setState({polylineCoords: getRouteCoordinates(response)})
      });

    const duration = {
      distance: {}
    };
    getDuration(this.props.region, this.props.concert.position)
      .then((response) => {
        duration.car = response.duration.text;
        duration.distance.driving = response.distance.text
        return duration;
      })
      .then((duration) => {
        getDuration(this.props.region, this.props.concert.position, 'walking')
          .then((response) => {
            duration.walk = response.duration.text;
            duration.distance.walking = response.distance.text
            return duration;
          })
          .then((duration) => {
          getDuration(this.props.region, this.props.concert.position, 'bicycling')
            .then((response) => {
              duration.bike = response.duration.text;
              duration.distance.bicycling = response.distance.text
              return duration;
            })
            .then((duration) => {
                getDuration(this.props.region, this.props.concert.position, 'transit')
                .then((response) => {
                    duration.transit = response.duration.text;
                    duration.distance.transit = response.distance.text;

                    this.setState({duration});
                });
          });
      });
    });
  }

  setMode(mode) {
    if(mode !== this.state.mode) {
      getDirection(this.props.region, this.props.concert.position, mode)
        .then((response) => {
          this.setState({polylineCoords: getRouteCoordinates(response), mode: mode})
        });
    }
  }

	render() {
		const { concert, region, navigator } = this.props;

    const delta = concert.distance * 0.008;
    const routes = navigator.getCurrentRoutes(0);
    const prevRoute = routes[routes.length -2].title; // vorletzte

    return (
      <View style={detail.container}>
        <View style={detail.titlerow}>
          <View style={detail.acts}>
          <Text style={fonts.title}>
            {concert.title}
          </Text>
          {concert.support ?
            <Text style={fonts.importantInfo}>
              with {concert.support}
            </Text>
          : null }
          {concert.subSupport ?
            <Text style={fonts.importantInfo}>
              and {concert.subSupport}
            </Text>
          : null }
          </View>
          <Text style={detail.ticketButton}
            onPress={() => Linking.openURL(`${TICKETMASTER_URL}${concert.title}+${concert.city}`)}>
            Ticket kaufen
          </Text>
         </View>

         <View style={detail.imageView}>
          <Image style={detail.image}
            source={{uri: concert.image}}>
            <Routenplaner duration={this.state.duration} setMode={this.setMode}/>
          </Image>
        </View>

        <View style={detail.row}>
          <View style={detail.address}>
            <Text style={fonts.title}>
              {concert.datetime}  {concert.time}
            </Text>
            <Text style={fonts.importantInfo}>
              {concert.venue}
            </Text>
            <Text style={fonts.importantInfo}>
               {this.state.street}
            </Text>
            <Text style={fonts.importantInfo}>
              {this.state.zip} {concert.city}
            </Text>
          </View>

          <Play artist={concert.title}/>
        </View>

        <View style={detail.row}>
        <Text style={[fonts.link, detail.row]}
          onPress={() => Linking.openURL(`${this.state.venueLink}`)}>
          {this.state.venueLink}
        </Text>
        <Text style={fonts.info}>
          {this.state.duration.distance[this.state.mode]}
        </Text>
        </View>

        <MapView
          style={detail.map}
          region={{
            latitude: concert.position.lat,
            longitude: concert.position.lng,
            latitudeDelta: delta,
            longitudeDelta: delta,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
          showsCompass={false}
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
              strokeColor="#008bae"
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
