import React, { Component, PropTypes } from 'react';
import {BackAndroid, View, Text, Image, Linking } from 'react-native';
import MapView from 'react-native-maps';

import { TICKETMASTER_URL } from '../../config/settings';
import { getRouteCoordinates } from '../../utils/map-utils';
import { getVenueDetails,
        getDuration,
        getDirection,
        getSongsByArtist,
        getSong } from '../../utils/api';

import { detail } from './detail';
import { fonts } from '../../config/styles';
import { marker } from '../../config/images';
import Routenplaner from '../Routenplaner';
import Player from '../CustomPlayer';

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
      zip: '',
      songTitle: '',
      url: null,
    }
  }

  componentDidMount() {
    this.getSong();
    this.getVenue();
    this.getDurations();

    getDirection(this.props.region, this.props.concert.position)
      .then((response) => {
        this.setState({polylineCoords: getRouteCoordinates(response)})
      });
  }

  getDurations() {
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

  getSong() {
    getSongsByArtist(this.props.concert.title).then((songs) => {
      if(songs.length > 0) {
        this.setState({songTitle: songs[0].title})

        getSong(songs[0].streamUrl).then((audio) => {
          this.setState({url: audio.http_mp3_128_url});
          // RCTAudio.prepare(audio.http_mp3_128_url, true)
        });
      }
    });
  }

  getVenue() {
    getVenueDetails(this.props.concert.venueId).then((details) => {
      this.setState({
        street: details.street,
        venueLink: details.venueLink,
        zip: details.zip
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

  calcDistance() {
    return this.props.concert.distance * 0.008;
  }

	render() {
		const { concert, region, navigator } = this.props;
    const delta = this.calcDistance();

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
            Ticket
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

          {this.state.url && this.state.songTitle ?
            <Player url={this.state.url} songTitle={this.state.songTitle} />
          : null }
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
            image={marker} />
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
