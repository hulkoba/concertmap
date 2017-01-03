import { StyleSheet } from 'react-native';

export const mapStyles = StyleSheet.create({
   container: {
   ...StyleSheet.absoluteFillObject,
   height: 400,
   width: 400,
   marginTop: 1,
   justifyContent: 'center',
   alignItems: 'flex-start',
 },
 map: {
   flex: 1,
   marginTop: 55,
   ...StyleSheet.absoluteFillObject,
 },
});