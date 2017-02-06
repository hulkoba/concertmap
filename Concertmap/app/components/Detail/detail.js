import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');
export const detail = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
    marginTop: -33,
  },
  row: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 6,
  },
  titlerow: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  acts: {
    flex: 3,
  },
  address: {
    justifyContent: 'space-between',
  },
  ticketButton: {
    flex: 1,
    backgroundColor: colors.blue,
    color: colors.white,
    borderRadius: 2,
    padding: 4,
    textAlign: 'center',
    fontSize: 14,
    height: 30,
  },
  image: {
    flex: 1,
    height: 200,
    backgroundColor: colors.grey,
    resizeMode: 'contain',
  //  marginHorizontal: -12,
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
    flex: 1,
	 },
});
