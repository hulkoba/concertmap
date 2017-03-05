import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');

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
    fontFamily: 'Track',
		fontSize: 16,
		color: colors.lightGrey,
    paddingHorizontal: window.width/5,
    marginTop: 12,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 4,
    paddingBottom: 12,
  },
  tabTextActive: {
    color: colors.white,
    borderBottomColor: colors.blue,
    borderBottomWidth: 4,
    fontFamily: 'Track',
    fontSize: 16,
		paddingHorizontal: window.width/5,
		marginTop: 12,
		paddingBottom: 12,
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
  ticketButton: {
    backgroundColor: colors.blue,
    color: colors.white,
    borderRadius: 2,
    padding: 4,
    marginRight: 6,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 14,
    height: 27,
    minWidth: 99,
    alignSelf: 'flex-end'
  },
  icon: {
    color: colors.blue,
    fontSize: 18,
    fontFamily: 'Lato-Regular',
    marginRight: 6,
  },
});
