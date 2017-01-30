import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export const list = StyleSheet.create({
  container: {
    flex: 1,
     marginTop: 6,
  },
  list: {
   ...StyleSheet.absoluteFillObject,
  },
  row: {
    padding: 14,
    paddingTop: 0,
    backgroundColor: colors.black,
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 40,
    paddingVertical: 10,
  },
  sklogo: {
    height: 22,
    width: 77,
  },
  skImageView: {
    marginTop: 6,
    height: 33,
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: colors.grey,
    marginHorizontal: 25,
  },
  image: {
    width: 75,
    height: 75,
  },
  imageView: {
    width: 33,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 1
  },
});
