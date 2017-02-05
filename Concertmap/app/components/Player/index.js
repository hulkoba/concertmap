import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import { ReactNativeAudioStreaming, Player } from 'react-native-audio-streaming';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { getSongsByArtist, getSong } from '../../utils/api';
import { style } from './player';

class Play extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      title: '',
      url: null,
    };

  /*  ReactNativeAudioStreaming.pause();
      ReactNativeAudioStreaming.resume();
      ReactNativeAudioStreaming.play(this.state.url, {showIniOSMediaCenter: true, showInAndroidNotifications: true});
    ReactNativeAudioStreaming.stop();*/
  }

  togglePlay() {
    if(this.state.isPlaying) {
      this.setState({isPlaying: false});
      //ReactNativeAudioStreaming.pause()
    } else {
      this.setState({isPlaying: true});
      //alert(this.state.url);
   //   ReactNativeAudioStreaming.play(this.state.url, {})
    }
  }

  componentDidMount () {
    const songs = getSongsByArtist(this.props.artist).then((songs) => {
      alert(JSON.stringify(songs));
      //const mp3 = songs.find((song) => (song.format.includes('VBR MP3')));

     // alert('### mp3 '+JSON.stringify(mp3));

          //this.setState({title: songs[0].title})
        getSong(songs[0].streamUrl).then((audio) => {
          alert(JSON.stringify(audio.http_mp3_128_url));

          this.setState({url: audio.http_mp3_128_url})
          ReactNativeAudioStreaming.play(audio.http_mp3_128_url, {})
        })

    })
  }

  render() {
    return (
      <View>
       {this.state.url ?
          <View>
            <Text>{this.state.title}</Text>
            <TouchableOpacity onPress={this.togglePlay.bind(this)}>

              {/*this.state.isPlaying ?

                  <MaterialIcons name="pause-circle-outline" style={style.icon} />
                  :
                  <MaterialIcons name="play-circle-outline" style={style.icon} />
              */}
            </TouchableOpacity>
            <Player url={this.state.url}/>
        </View>
        : null }
      </View>
    )
  }
}

export default Play
