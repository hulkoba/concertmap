import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');
export const detail = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
    padding: 12,
    marginTop: -40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 12,
    paddingTop: 12,
  },
  address: {
    justifyContent: 'space-between',
  },
  image: {
    flex: 1,
    height: 200,
    backgroundColor: colors.grey,
    resizeMode: 'contain',
   // marginHorizontal: -12,
  //  width: window.width,
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
    height: 222,
	 },
});
