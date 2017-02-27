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
  // detail view
  tabTextShare: {
    marginTop: 12,
    marginRight: 12,
		paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabTextBack: {
    marginTop: 6,
    color: colors.white,
    fontSize: 14,
    fontFamily: 'Track',
    marginLeft: 6,
  },
  icon: {
    color: colors.blue,
    fontSize: 18,
    fontFamily: 'Lato-Regular',
    marginRight: 6,
  },
});
