import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export const filterBar = StyleSheet.create({
  bar: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginLeft: 5,
  },
  filter: {
    fontFamily: 'Lato',
    backgroundColor: colors.blue,
    color: colors.white,
    borderRadius: 0,
    height: 40,
    marginRight: 5,
    padding: 4,
    textAlign: 'center',
    fontSize: 14,
  }
});
