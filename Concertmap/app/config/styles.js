import { StyleSheet } from 'react-native';

export const colors = {
  blue: '#008bae',
  pressedBlue: '#006279',
  white: '#e6e6e6',
  lightGrey: '#7d7d7d',
	black: '#1a1a1a',
};

export const fonts = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: 'Track',
    color: colors.white,
    marginBottom: 6,
  },
  subTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    color: colors.white,
    marginTop: 6,
  },
  importantInfo: {
    fontFamily: 'Lato',
    fontSize: 14,
    color: colors.white
  },
  info: {
    fontSize: 12,
    color: colors.lightGrey,
  },
  link: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    color: colors.blue,
    paddingVertical: 12,
  }
});
