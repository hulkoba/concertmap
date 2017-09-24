import React from 'react';
import { TouchableOpacity, Text, Share } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { style } from './shareBtn';
import { colors } from '../../config/styles';

getActs = (gig) => {
	if (gig.support) {
		return `${gig.title} und ${gig.support}`;
	} else if (gig.subsupport) {
		return `${gig.title}, ${gig.support} und ${gig.subSupport}`;
	}
	return gig.title;
}

shareGig = (gig) => {
	Share.share({
		message: `ich gehe ${gig.datetime} zu ${getActs(gig)} im ${gig.venue}. Kommst du mit?`,
		title: `Hey`
	}, {
			dialogTitle: 'Teilen',
			tintColor: colors.blue
		}).then()
		.catch((error) => console.warn(error.message));
}

const ShareBtn = ({ gig }) => (
	<TouchableOpacity activeOpacity={0.6}
		style={style.ShareText}
		onPress={shareGig.bind(this, gig)}>
		<MaterialIcons name="share" style={style.shareIcon} />
		<Text style={style.shareIcon}>Teilen</Text>
	</TouchableOpacity>
)

export default ShareBtn;
