import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackAndroid, View, Text, Image, Linking } from 'react-native';
import MapView from 'react-native-maps';

import { getMatchedSong } from '../../utils/song-utils';
import { getRouteCoordinates } from '../../utils/map-utils';
import { getVenueDetails, getDuration, getDirection, getSongsByArtist, getSong } from '../../utils/api';

import { detail } from './detail';
import { fonts } from '../../config/styles';
import { marker } from '../../config/images';

import DetailHeader from '../DetailHeader';
import Routenplaner from '../Routenplaner';
import Player from '../CustomPlayer';

const propTypes = {
	concert: PropTypes.object.isRequired,
	region: PropTypes.object.isRequired,
	navigator: PropTypes.object.isRequired
};
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
		this.setTravelMode = this.setTravelMode.bind(this);
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
			url: null
		};
	}

	componentDidMount() {
		this.getSong();
		this.getVenue();
		this.getDurations();

		getDirection(this.props.region, this.props.concert.position).then(response => {
			this.setState(() => {
				return {
					polylineCoords: getRouteCoordinates(response)
				};
			});
		});
	}

	getDurations() {
		const duration = { distance: {} };
		getDuration(this.props.region, this.props.concert.position)
			.then(response => {
				duration.car = response.duration.text;
				duration.distance.driving = response.distance.text;
				return duration;
			})
			.then(duration => {
				getDuration(this.props.region, this.props.concert.position, 'walking')
					.then(response => {
						duration.walk = response.duration.text;
						duration.distance.walking = response.distance.text;
						return duration;
					})
					.then(duration => {
						getDuration(this.props.region, this.props.concert.position, 'bicycling')
							.then(response => {
								duration.bike = response.duration.text;
								duration.distance.bicycling = response.distance.text;
								return duration;
							})
							.then(duration => {
								getDuration(this.props.region, this.props.concert.position, 'transit')
									.then(response => {
										duration.transit = response.duration.text;
										duration.distance.transit = response.distance.text;

										this.setState(() => {
											duration;
										});
									});
							});
					});
			});
	}

	getSong() {
		getSongsByArtist(this.props.concert.title).then(songs => {
			if (songs.length) {
				const matchedSong = getMatchedSong(songs, this.props.concert.title);

				if (matchedSong) {
					this.setState({ songTitle: matchedSong.title });

					getSong(matchedSong.streamUrl).then(audio => {
						this.setState({ url: audio.http_mp3_128_url });
					});
				}
			}
		});
	}

	getVenue() {
		getVenueDetails(this.props.concert.venueId).then(details => {
			this.setState({
				street: details.street,
				venueLink: details.venueLink,
				zip: details.zip
			});
		});
	}

	setTravelMode(mode) {
		if (mode !== this.state.mode) {
			getDirection(this.props.region, this.props.concert.position, mode).then(response => {
				this.setState(() => {
					return {
						polylineCoords: getRouteCoordinates(response),
						mode: mode
					};
				});
			});
		}
	}

	calcDistance() {
		return this.props.concert.distance * 0.008;
	}

	render() {
		const { concert } = this.props;
		const delta = this.calcDistance();

		return (
			<View style={detail.container}>
				<DetailHeader gig={concert} />

				<View style={detail.imageView}>
					<Image style={detail.image} source={{ uri: concert.image }}>
						<Routenplaner duration={this.state.duration} setTravelMode={this.setTravelMode} />
					</Image>
				</View>

				<View style={detail.row}>
					<View style={detail.address}>
						<Text style={fonts.title}>
							{concert.datetime} {concert.time}
						</Text>
						<Text style={fonts.importantInfo}>{concert.venue}</Text>
						<Text style={fonts.importantInfo}>{this.state.street}</Text>
						<Text style={fonts.importantInfo}>
							{this.state.zip} {concert.city}
						</Text>
					</View>

					{this.state.url && this.state.songTitle ? (
						<Player url={this.state.url} songTitle={this.state.songTitle} />
					) : null}
				</View>

				<View style={detail.row}>
					<Text style={[fonts.link, detail.link]} onPress={() => Linking.openURL(`${this.state.venueLink}`)}>
						{this.state.venueLink}
					</Text>
					<Text style={[fonts.info, detail.distance]}>{this.state.duration.distance[this.state.mode]}</Text>
				</View>

				<MapView
					style={detail.map}
					region={{
						latitude: concert.position.lat,
						longitude: concert.position.lng,
						latitudeDelta: delta,
						longitudeDelta: delta
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
							longitude: concert.position.lng
						}}
						title={concert.title}
						image={marker}
					/>
					<MapView.Polyline coordinates={this.state.polylineCoords} strokeWidth={2} strokeColor="#008bae" />
				</MapView>
			</View>
		);
	}
}

Detail.propTypes = propTypes;
