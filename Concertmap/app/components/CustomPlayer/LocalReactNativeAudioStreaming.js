import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    DeviceEventEmitter,
    ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const { ReactNativeAudioStreaming } = NativeModules;
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';

import { external } from './customPlayer';

// Possibles states
const PLAYING = 'PLAYING';
const STREAMING = 'STREAMING';
const PAUSED = 'PAUSED';
const STOPPED = 'STOPPED';
const ERROR = 'ERROR';
const METADATA_UPDATED = 'METADATA_UPDATED';
const BUFFERING = 'BUFFERING';
const START_PREPARING = 'START_PREPARING'; // Android only
const BUFFERING_START = 'BUFFERING_START'; // Android only

class CustomPlayer extends Component {
    // NOTE added
    static stop() {
      ReactNativeAudioStreaming.stop();
    }

    constructor(props) {
      super(props);
      this._onPress = this._onPress.bind(this);
      this.state = {
          status: STOPPED,
      };
    }

    componentDidMount() {
      this.subscription = DeviceEventEmitter.addListener(
        'AudioBridgeEvent', (evt) => {
          // We just want meta update for song name
          if (evt.status === METADATA_UPDATED && evt.key === 'StreamTitle') {
            this.setState({song: evt.value});
          } else if (evt.status != METADATA_UPDATED) {
            this.setState(evt);
          }
        }
      );

      ReactNativeAudioStreaming.getStatus((error, status) => {
          (error) ? console.log(error) : this.setState(status)
      });
    }

    _onPress() {
      switch (this.state.status) {
        case PLAYING:
        case STREAMING:
            ReactNativeAudioStreaming.pause();
            break;
        case PAUSED:
            ReactNativeAudioStreaming.resume();
            break;
        case STOPPED:
        case ERROR:
            ReactNativeAudioStreaming.play(this.props.url, {showIniOSMediaCenter: true, showInAndroidNotifications: true});
            break;
        case BUFFERING:
            ReactNativeAudioStreaming.stop();
            break;
      }
    }

    render() {
      let icon = null;
    //  let title = null;
      switch (this.state.status) {
        case PLAYING:
         //   title = <Text style={external.songName}>{this.props.songTitle}</Text>;
        case STREAMING:
            icon = <MaterialIcons name="pause-circle-outline" style={external.icon} />;
            break;
        case PAUSED:
        case STOPPED:
        case ERROR:
            icon = <MaterialIcons name="play-circle-outline" style={external.icon} />;
            break;
        case BUFFERING:
        case BUFFERING_START:
        case START_PREPARING:
            icon = <ActivityIndicator
                animating={true}
                style={{height: 80}}
                size="large"
            />;
            break;
        }

        return (
          <TouchableOpacity style={external.container} onPress={this._onPress}>
            {icon}
            <Text style={external.songName}>{this.props.songTitle}</Text>
          </TouchableOpacity>
        );
    }
}

CustomPlayer.propTypes = {
    url: React.PropTypes.string.isRequired,
    songTitle: React.PropTypes.string.isRequired
};

export { CustomPlayer }
