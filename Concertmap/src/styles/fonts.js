import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const fonts = StyleSheet.create({
  title: {
    fontSize: 22,
    fontFamily: 'Roboto',
    color: colors.white,
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: colors.white
  },
  info: {
    fontSize: 14,
    color: colors.lightGrey,
  },
  description: {
    fontFamily: 'Roboto',
    fontSize: 10,
    color: colors.grey,
  },
});
