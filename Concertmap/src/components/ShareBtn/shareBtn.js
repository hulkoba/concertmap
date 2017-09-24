import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export const style = StyleSheet.create({
  ShareText: {
    marginTop: 12,
    marginRight: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareIcon: {
    color: colors.blue,
    fontSize: 18,
    fontFamily: 'Lato-Regular',
    marginRight: 6,
  },
});
