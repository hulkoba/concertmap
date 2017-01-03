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
  tabBarText: {
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    fontSize: 16,
    marginTop: 20
  },
  tabBarUnderline: {
    backgroundColor: '#008bae',
    height: 1,
    zIndex: 1,
  }
});