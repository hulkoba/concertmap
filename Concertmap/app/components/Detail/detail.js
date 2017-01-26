import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');
export const detail = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
    padding: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 12,
    paddingTop: 12,
  },
  image: {
    height: 200,
    marginHorizontal: -12,
    width: window.width,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
  },
  imageView: {
    marginTop: 6,
    marginBottom: 12,
    flexDirection:'row',
    alignItems: 'stretch',
  },
  map: {
		height: 111,
	 },
});
