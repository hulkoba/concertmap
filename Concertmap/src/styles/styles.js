import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  tabBar: {
    backgroundColor: colors.black,
		zIndex: 0.
  },
  tabText: {
    fontFamily: 'Roboto',
		fontSize: 22,
		color: colors.lightGrey,
		paddingHorizontal: 66,
		marginTop: 12,
		borderBottomColor: colors.lightGrey,
		borderBottomWidth: 4,
		paddingBottom: 12,
  },
	tabTextActive: {
		color: colors.white,
		borderBottomColor: colors.blue,
		borderBottomWidth: 4,
		fontFamily: 'Roboto',
		fontSize: 22,
		paddingHorizontal: 66,
		marginTop: 12,
		paddingBottom: 12,
	},
	dsplNone: {
		width: 0,
	},

});
