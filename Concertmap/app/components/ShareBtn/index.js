import React, { Component } from 'react';
import { TouchableHighlight, View, Text } from 'react-native';

import FBSDK from 'react-native-fbsdk';
const { ShareDialog } = FBSDK;

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { style } from './shareBtn';

class ShareBtn extends Component {

  shareConcert = (data) => {
    const shareLinkContent = {
      contentType: 'link',
      contentTitle: `${data.title} im ${data.venue}!`,
      contentUrl: data.url,
      contentDescription: `Kommt alle mit zu ${data.title} im ${data.venue}!`,
    };

    if( data.image) {
      shareLinkContent.imageUrl = data.image;
    }
    ShareDialog.canShow(shareLinkContent).then(
      function(canShow) {
        if (canShow) { return ShareDialog.show(shareLinkContent) }
      }
    ).then(
      function(result) {
        if (result.isCancelled) { alert('Share operation was cancelled') } else {
          alert('Share was successful with postId: ' + result.postId); }
      },
      function(error) { alert('Share failed with error: ' + error) }
    );
  };

  render() {
    return (
      <TouchableHighlight onPress={() => this.shareConcert(this.props.concert)}>
        <View style={style.ShareText} >
          <MaterialIcons name="share" style={style.shareIcon} />
          <Text style={style.shareIcon}>Teilen</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

export default ShareBtn
