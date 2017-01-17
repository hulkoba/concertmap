import { StyleSheet } from 'react-native';
import { colors } from '../config/styles';

export const filterBar = StyleSheet.create({
  bar: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: colors.black,
    height: 30,
    flexDirection:'row',
    justifyContent: 'space-between',
   // justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  filterRow: {
    flexDirection:'row',
  },
  filter: {
    backgroundColor: colors.blue,
    color: colors.white,
    borderRadius: 5,
    width: 55,
    height: 26,
    marginRight: 6,
    padding: 4,
    textAlign: 'center',
    fontSize: 12,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
    color: colors.white,
  },
  filterIcon: {
    transform: [{ rotate: '90deg' }]
  }
});
