import React from 'react';
import { TouchableHighlight, View, Text, Share } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { style } from './shareBtn';

exports.framework = 'React';
exports.title = 'Share';
exports.description = 'Share data with other Apps.';
exports.examples = [{
	title: 'Share Text Content',
	render() {
		return <ShareBtn />;
	}
}];

function shareGig(gig) {
 	Share.share({
 		message: `Kommst du mit? - ${gig.url}`,
 		url: gig.url,
 		title: `Hey, ich gehe ${gig.datetime} zu ${gig.title} im ${gig.venue}.`
 	}, {
 		dialogTitle: '',
 		excludedActivityTypes: [
 		'com.apple.UIKit.activity.PostToTwitter'
 		],
 		tintColor: 'blue'
 	}).then()
 	.catch((error) => console.warn(error.message));
 }

const ShareBtn = ({gig}) => (
  <TouchableHighlight onPress={() => shareGig(gig)}>
    <View style={style.ShareText} >
      <MaterialIcons name="share" style={style.shareIcon} />
      <Text style={style.shareIcon}>Teilen</Text>
    </View>
  </TouchableHighlight>
)

export default ShareBtn;
