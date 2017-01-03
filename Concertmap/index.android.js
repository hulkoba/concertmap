import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ActivityIndicator,
  Navigaror,
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import { styles } from './styles/styles';
import ConcertList from './components/ConcertList';
import ConcertMap from './components/ConcertMap';


class Concertmap extends Component {

  state = {
    loading: true,
    error: false,
    movies: [],
    position: 'unknown'
  };
  
  componentDidMount() {   
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({position});
        alert(position.coords.lantitude, '\n', position.coords.longitude);
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 3000}
    );

    this.getMoviesFromApiAsync();
  }


  getMoviesFromApiAsync = () => {
    return fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => response.json())
    .then((responseJson) => {
      
     this.setState({ loading: false, movies: responseJson.movies });      
    
     return responseJson;
    })
    .catch((error) => {
      alert(error.message);
      this.setState({ error: true }); 
      return error;
    });
  }

  renderError = () => {
    return (
      <View style={styles.center}>
        <Text>
          Failed to load Gigs!
        </Text>
      </View>
    )
  }

   // source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
  render() {
    const { movies, loading, error } = this.state
       
    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator animating={true} />
        </View>
      )
    }
    if (error) {
     this.renderError();
    }

    return (
      <ScrollableTabView
        tabBarBackgroundColor='#1a1a1a'
        tabBarActiveTextColor='#e6e6e6'
        tabBarInactiveTextColor='#7d7d7d'
        tabBarTextStyle={styles.tabBarText}
        tabBarUnderlineStyle={styles.tabBarUnderline}>
        
        <ConcertList tabLabel="List" concerts={movies}  />
        <ConcertMap tabLabel="Map" concerts={movies}  />
      </ScrollableTabView>
    )
  }
}

AppRegistry.registerComponent('Concertmap', () => Concertmap);
