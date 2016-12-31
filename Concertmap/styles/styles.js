import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    borderBottomWidth: 1,
    borderBottomColor: '#363636',
    backgroundColor: '#1a1a1a',
  },
  image: {

  },
  titleRow: {
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 22,
    color: '#e6e6e6',
    flex: 1,
    
  },
  distance: {
    fontSize: 14,
    color: '#363636',    
    flex: 1,
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: '#e6e6e6'
  },
  description: {
    fontFamily: 'Roboto',
    fontSize: 10,
    color: '#363636'
  },
});