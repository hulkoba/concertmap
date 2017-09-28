import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

const halfTransparent = 'rgba(0,0,0,0.6)';

export const routenplaner = StyleSheet.create({
	container: {
		height: 50,
		paddingVertical: 4,
		paddingHorizontal: 22,
		backgroundColor: halfTransparent,
		flexDirection: 'row',
		alignItems: 'stretch',
		justifyContent: 'space-between'
	},
	duration: {
		color: colors.white,
		textAlign: 'center',
		fontSize: 10
	},
	icon: {
		textAlign: 'center',
		fontSize: 24,
		color: colors.white
	}
});
