import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export const style = StyleSheet.create({
  titlerow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  acts: {
    flex: 3,
  },
  ticketButton: {
    flex: 1,
    backgroundColor: colors.blue,
    color: colors.white,
    borderRadius: 2,
    padding: 4,
    marginRight: 6,
    textAlign: 'center',
    fontSize: 14,
    height: 27,
    minWidth: 99,
  }
});
