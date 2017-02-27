import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

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
  },
  tabText: {
		color: colors.lightGrey,
  },
  tabIndicator: {
    backgroundColor: colors.blue,
    height: 3,
  },
	tabTextActive: {
		color: colors.white,
		fontFamily: 'Track',
		fontSize: 16,
	},
});
