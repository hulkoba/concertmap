import { StyleSheet } from 'react-native';
import { colors } from '../config/styles';

export const routenplaner = StyleSheet.create({
  container: {
    height: 50,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    flexDirection:'row',
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  duration: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 10,
  },
  icon: {
    textAlign: 'center',
    fontSize: 20,
    color: colors.white,
  },
  ticketButton: {
    backgroundColor: colors.blue,
    color: colors.white,
    borderRadius: 5,
    padding: 4,
    textAlign: 'center',
    fontSize: 14,
  },

});
