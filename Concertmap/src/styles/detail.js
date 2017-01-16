import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const detail = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
    padding: 12,
  },
  image: {
    height: 200,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
  },
  imageView: {
    flex: 1,
    marginHorizontal: -12,
    marginTop: 6,
    marginBottom: 12,
    flexDirection:'row',
    alignItems: 'stretch',
  },
});
