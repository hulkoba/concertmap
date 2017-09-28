import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import RCTAudio from 'react-native-player';
import Subscribable from 'Subscribable';

import { style } from './customPlayer';

const INIT = 'INIT';
//const PREPARING = 'PREPARING';
const PLAYING = 'PLAYING';
const PAUSED = 'PAUSED';

const propTypes = {
	url: PropTypes.string.isRequired,
	songTitle: PropTypes.string.isRequired
};
class Player extends Component {
	mixins = [Subscribable.Mixin];
	constructor(props) {
		super(props);
		this.toggleSong = this.toggleSong.bind(this);
		// this.onPreparing = this.onPreparing.bind(this);
		//  this.onReady = this.onReady.bind(this);
		//  this.onEnd = this.onEnd(this);
		this.state = {
			playStatus: INIT
		};
	}

	componentWillMount() {
		// RCTDeviceEventEmitter.addListener('preparing', this.onPreparing);
		// RCTDeviceEventEmitter.addListener('ready', this.onReady);
		RCTDeviceEventEmitter.addListener('end', this.onEnd);
	}

	// componentDidMount() {
	// }

	componentWillUnmount() {
		if (this.state.playStatus !== INIT) {
			this.setState({ playStatus: INIT });
			RCTAudio.stop();
		}
	}

	onPreparing() {
		this.setState({ playStatus: INIT });
	}

	onEnd() {
		RCTAudio.stop();
		this.setState({ playStatus: INIT });
	}

	start() {
		RCTAudio.prepare(this.props.url, true);
		this.setState({ playStatus: PLAYING });
		RCTAudio.start();
	}

	pause() {
		this.setState({ playStatus: PAUSED });
		RCTAudio.pause();
	}

	resume() {
		RCTAudio.resume();
		this.setState({ playStatus: PLAYING });
	}

	toggleSong() {
		if (this.state.playStatus === INIT) {
			this.start();
		} else if (this.state.playStatus === PLAYING) {
			this.pause();
		} else if (this.state.playStatus === PAUSED) {
			this.resume();
		}
	}

	renderIcon() {
		switch (this.state.playStatus) {
		case INIT:
			return <MaterialIcons name="play-circle-outline" style={style.icon} />;
		case PLAYING:
			return <MaterialIcons name="pause-circle-outline" style={style.icon} />;
		case PAUSED:
			return <MaterialIcons name="play-circle-outline" style={style.icon} />;
			/*  case PREPARING:
			return (
				<ActivityIndicator
					animating={true} style={style.animator} />
			);*/
		}
	}

	render() {
		return (
			<TouchableOpacity onPress={this.toggleSong}>
				{this.renderIcon()}
				<Text style={style.songName}>{this.props.songTitle}</Text>
			</TouchableOpacity>
		);
	}
}

Player.propTypes = propTypes;

export default Player;
