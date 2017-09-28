import { StyleSheet } from 'react-native';

import { colors } from '../../config/styles';

export const style = StyleSheet.create({
	container: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		paddingHorizontal: 10,
	},
	icon: {
		fontSize: 33,
		color: colors.blue,
		margin: 6,
		alignSelf: 'center',
	},
	songName: {
		textAlign: 'center',
		fontSize: 12,
		fontFamily: 'Lato',
		color: colors.lightGrey,
		width: 155,
	},
	animator: {
		height: 33,
		margin: 6,
	}
});