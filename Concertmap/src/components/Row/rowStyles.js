import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export const style = StyleSheet.create({
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
    paddingRight: 3,
    alignItems: 'flex-end'
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
});
