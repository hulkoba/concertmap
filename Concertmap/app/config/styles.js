import { StyleSheet } from 'react-native';

export const colors = {
  blue: '#008bae',
  white: '#e6e6e6',
  lightGrey: '#7d7d7d',
  grey: '#363636',
	black: '#1a1a1a',
};

export const fonts = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: 'Track',
    color: colors.white,
  },
  subTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    color: colors.white
  },
  importantInfo: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    color: colors.white
  },
  info: {
    fontSize: 12,
    color: colors.lightGrey,
  },
  description: {
    fontFamily: 'Lato-Regular',
    fontSize: 10,
    color: colors.grey,
  },
  link: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    color: colors.blue,
    paddingVertical: 12,
  }
});
