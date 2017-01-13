import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { fonts } from './fonts';

export const detail = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  image: {
    height: 200,
    alignSelf: 'stretch',
  },
  imageView: {
    marginHorizontal: -12,
    marginTop: 6,
    marginBottom: 12,
    flexDirection:'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },

});
