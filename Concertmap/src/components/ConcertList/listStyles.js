import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export const list = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 6,
	},
	list: {
		...StyleSheet.absoluteFillObject,
	},
	separator: {
		height: 1,
		backgroundColor: colors.grey,
		marginHorizontal: 25,
	},
	sklogo: {
		height: 22,
		width: 77,
	},
	skImageView: {
		marginTop: 6,
		height: 33,
		alignItems: 'center',
	},
});
