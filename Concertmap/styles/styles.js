import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#363636',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const listStyles = StyleSheet.create({
  row: {
    padding: 15,
    marginBottom: 1,
    backgroundColor: '#1a1a1a',
    fontFamily: 'Roboto',
    fontSize: 22,
    color: '#e6e6e6'
  },
  rowTitle: {
    fontSize: 22,
    color: '#e6e6e6'
  },
  rowSubTitle: {
    fontSize: 14,
    color: '#e6e6e6'
  },
  rowText: {
    fontSize: 10,
    color: '#363636'
  }
});