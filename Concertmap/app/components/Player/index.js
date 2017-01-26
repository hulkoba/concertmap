import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

import RCTAudio from 'react-native-player';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { settings } from '../../config/settings';
import { style } from './player';

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
    };
  }

  componentWillMount () {
  //  RCTDeviceEventEmitter.addListener('error', this.onError)
    RCTDeviceEventEmitter.addListener('end', this.onEnd)
    RCTDeviceEventEmitter.addListener('ready', this.onReady)
    RCTDeviceEventEmitter.addListener('buffering', this.onBuffering)
    //RCTDeviceEventEmitter.addListener('preparing', this.onPreparing)
  }

  componentDidMount () {
    RCTAudio.prepare(`http://api.soundcloud.com/tracks.json?client_id=${settings.SOUNDCLOUD_CLIENT_ID}`, true);
    // this.playSong(formatStreamUrl(song.stream_url))
  }

  componentWillReceiveProps (nextProps) {
   /* const {playingSongId} = this.props
    const song = nextProps.songs[playingSongId]
    if (nextProps.playingSongId && nextProps.playingSongId === playingSongId) {
      return
    }
    this.playSong(formatStreamUrl(song.stream_url))*/
  }

  playSong () {
   // RCTAudio.prepare(url, true)
    if(this.state.isPlaying) {
      RCTAudio.pause();
      this.pause();
    } else {
      RCTAudio.start();
    }
    this.setState({isPlaying: !this.state.isPlaying});
  }

  pause () { RCTAudio.pause() }
  resume () { RCTAudio.resume() }
  onBuffering () { alert('on buffering...') }
  // onError (err) { alert(JSON.stringify(err)); }
  // onError (err) { alert(JSON.stringify(err)); }
  onEnd () { console.log('on end...') }
  onReady () { alert('on ready...') }
  // onPreparing () { alert('on preparing...') }

  render() {
    return (
      <TouchableOpacity onPress={this.playSong.bind(this)}>
        {this.state.isPlaying ?
          <MaterialIcons name="pause-circle-outline" style={style.icon} />
          :
          <MaterialIcons name="play-circle-outline" style={style.icon} />
        }
      </TouchableOpacity>
    )
  }
}

export default Player