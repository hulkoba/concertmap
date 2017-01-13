import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const list = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    marginTop: 45,
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
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 1
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 22,
    color: colors.white,
  },
  distance: {
    fontSize: 14,
    color: colors.lightGrey,
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: colors.white
  },
  description: {
    fontFamily: 'Roboto',
    fontSize: 10,
    color: colors.grey,
  },
});
