import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export const style = StyleSheet.create({
  bar: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    marginHorizontal: -2,
    marginTop: 6,
  },
  filter: {
    alignSelf: 'stretch',
    fontFamily: 'Lato',
    backgroundColor: colors.blue,
    color: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 0,
    fontSize: 14,
  },
  activeFilter: {
    backgroundColor: colors.pressedBlue,
    fontFamily: 'Lato',
    color: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    alignSelf: 'stretch'

  }
});
