import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');

export const style = StyleSheet.create({
	titlerow: {
		minHeight: 33,
		width: window.width - 111
	}
});
