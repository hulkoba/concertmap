import { StyleSheet } from 'react-native';

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
    backgroundColor: '#1a1a1a',
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
    backgroundColor: '#363636',
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
    color: '#e6e6e6',
  },
  distance: {
    fontSize: 14,
    color: '#7d7d7d',
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: '#e6e6e6'
  },
  description: {
    fontFamily: 'Roboto',
    fontSize: 10,
    color: '#363636',
  },
});
