import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export const filterBar = StyleSheet.create({
  bar: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  filter: {
    fontFamily: 'Lato',
    backgroundColor: colors.blue,
    color: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 4,
    margin: 0,
    fontSize: 14,
    alignSelf: 'center'
  }
});
