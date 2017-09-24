import { StyleSheet } from 'react-native';

export const colors = {
  blue: '#008bae',
  pressedBlue: '#006279',
  white: '#e6e6e6',
  lightGrey: '#7d7d7d',
  grey: '#363636',
  black: '#1a1a1a',
};

export const fonts = StyleSheet.create({
  title: {
    fontSize: 17,
    fontFamily: 'Track',
    color: colors.white,
  },
  action: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    color: colors.pressedBlue,
    marginBottom: 3,
  },
  subTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    color: colors.white,
  },
  importantInfo: {
    fontFamily: 'Lato',
    fontSize: 14,
    color: colors.white
  },
  info: {
    fontFamily: 'Lato',
    fontSize: 12,
    color: colors.lightGrey,
  },
  link: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: colors.blue,
    paddingBottom: 10,
  }
});
