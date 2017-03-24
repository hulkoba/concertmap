import React from 'react';
import { TouchableOpacity, Text, Share } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { style } from './shareBtn';
import { getVenueDetails } from '../../utils/api';

exports.framework = 'React';
exports.title = 'Share';
exports.description = 'Share data with other Apps.';
exports.examples = [{
	title: 'Share Text Content',
	render() {
		return <ShareBtn />;
	}
}];

getActs = (gig) => {
	if(gig.support) {
		return `${gig.title} und ${gig.support}`;
	} else if(gig.subsupport) {
		return `${gig.title}, ${gig.support} und ${gig.subSupport}`;
	}
	return gig.title;
}

getVenueLink = (venueId) => {
 getVenueDetails(venueId).then((details) => {
    return details.venueLink;
  });
}

shareGig = (gig) => {
 	Share.share({
 		message: 'Kommst du mit?',
 		url: getVenueLink(gig.venueId),
 		title: `Hey, ich gehe ${gig.datetime} zu ${getActs(gig)} im ${gig.venue}.`
 	}, {
 		dialogTitle: 'Teilen',
 		excludedActivityTypes: [
 		'com.apple.UIKit.activity.PostToTwitter'
 		],
 		tintColor: 'blue'
 	}).then()
 	.catch((error) => console.warn(error.message));
}

const ShareBtn = ({gig}) => (
  <TouchableOpacity activeOpacity={0.6}
  	style={style.ShareText}
  	onPress={shareGig.bind(this, gig)}>
    <MaterialIcons name="share" style={style.shareIcon} />
    <Text style={style.shareIcon}>Teilen</Text>
  </TouchableOpacity>
)

export default ShareBtn;
