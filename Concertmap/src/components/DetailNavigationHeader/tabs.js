import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
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
