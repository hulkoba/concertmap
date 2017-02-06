import React, { Component } from 'react';
import { View } from 'react-native';

import { CustomPlayer } from '../../config/LocalReactNativeAudioStreaming';
import { getSongsByArtist, getSong } from '../../utils/api';

class Play extends Component {
  constructor(props) {
    super(props);
    this.stopPlaying = this.stopPlaying.bind(this);

    this.state = {
      title: '',
      url: '',
    };
  }

  componentDidMount () {
    const songs = getSongsByArtist(this.props.artist).then((songs) => {
      if(songs.length > 0) {
        this.setState({title: songs[0].title})

        getSong(songs[0].streamUrl).then((audio) => {
          this.setState({url: audio.http_mp3_128_url})
        });
      }
    });
  }

  componentWillUnmount() {
    this.stopPlaying(this);
  }

  stopPlaying() {
    CustomPlayer.stop();
   // ReactNativeAudioStreaming.stop();
    // this.setState({title: '', url: ''});
  }

  render() {
    return (
      <View>
       {this.state.url ?
          <CustomPlayer url={this.state.url} songTitle={this.state.title}/>
        : null }
      </View>
    )
  }
}

export default Play
