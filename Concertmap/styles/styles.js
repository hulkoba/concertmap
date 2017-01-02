import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const listStyles = StyleSheet.create({
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
    borderBottomWidth: 1,
    borderBottomColor: '#363636',
    paddingVertical: 15,
    paddingRight: 15,
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
    color: '#363636',
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