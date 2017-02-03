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
    padding: 12,
    backgroundColor: colors.black,
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 35,

  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingRight: 3,
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
  separator: {
    height: 1,
    backgroundColor: colors.grey,
    marginHorizontal: 25,
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
});
