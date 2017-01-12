import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    backgroundColor: '#1a1a1a',
  },
  tabText: {
    fontFamily: 'Roboto',
		fontSize: 22,
		color: '#7d7d7d',
		paddingHorizontal: 66,
		marginTop: 12,
		borderBottomColor: '#7d7d7d',
		borderBottomWidth: 4,
		paddingBottom: 12,
  },
	tabTextActive: {
		color: '#e6e6e6',
		borderBottomColor: '#008bae',
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