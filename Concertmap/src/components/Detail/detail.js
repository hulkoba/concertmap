import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');
export const detail = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
    paddingLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 6,
  },
  address: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    flex: 1,
  },
  image: {
    flex: 1,
    height: 200,
    backgroundColor: colors.grey,
    resizeMode: 'contain',
    marginLeft: -10,
    width: window.width,
    justifyContent: 'flex-end',
  },
  imageView: {
    marginTop: 6,
    marginBottom: 12,
    flexDirection:'row',
    alignItems: 'stretch',
  },
  map: {
     // height: 111,
    width: window.width,
    height: 250,
    marginLeft: -10,
    flex: 1,
   },
});