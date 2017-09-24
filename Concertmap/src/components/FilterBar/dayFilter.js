import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export const style = StyleSheet.create({
  bar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  filter: {
    fontFamily: 'Lato',
    backgroundColor: colors.blue,
    color: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 18,
    margin: 0,
    fontSize: 14,
  },
  activeFilter: {
    backgroundColor: colors.pressedBlue,
    fontFamily: 'Lato',
    color: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 18,
    fontSize: 14,
  }
});
