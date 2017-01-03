import { StyleSheet } from 'react-native';

export const barStyles = StyleSheet.create({
  bar: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#1a1a1a',
    height: 30,
    flexDirection:'row',
    justifyContent: 'space-between',
   // justifyContent: 'flex-start',
    alignItems: 'flex-start',     
  },
  filterRow: {
    flexDirection:'row',
  },
  filter: {
    backgroundColor: '#008bae',
    color: '#e6e6e6',
    borderRadius: 5,
    width: 55,
    height: 26,
    marginRight: 6,
    padding: 4,
    textAlign: 'center',
    fontSize: 12,
  }, 
  icon: {
    fontSize: 24, 
    color: '#e6e6e6',
  } 
});