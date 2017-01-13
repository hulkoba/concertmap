import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const fonts = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: 'Roboto',
    color: colors.white,
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: colors.white
  },
  importantInfo: {
    fontFamily: 'Roboto',
    fontSize: 12,
    color: colors.white
  },
  info: {
    fontSize: 12,
    color: colors.lightGrey,
  },
  description: {
    fontFamily: 'Roboto',
    fontSize: 10,
    color: colors.grey,
  },
  link: {
    fontFamily: 'Roboto',
    fontSize: 12,
    color: colors.blue,
    paddingVertical: 12,
  }
});
