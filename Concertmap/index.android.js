/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

import { styles, listStyles } from './styles/styles';

// Row comparison function
const rowHasChanged = (r1, r2) => r1.id !== r2.id;

// DataSource template object
const ds = new ListView.DataSource({rowHasChanged});

class Concertmap extends Component {

  constructor (props) {
    super(props);   
    this.dataSource = ds;
  }

  state = {
    loading: true,
    error: false,
    movies: [],
    position: 'unknown'
  };
  

  componentDidMount() {   
    /*navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({position});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );*/

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

  // render functions
  renderRow = (movies) => {
    return (
      <Text style={listStyles.row}>
        {movies.title}
      </Text>
    )
  }

  renderError = () => {
    return (
      <View style={styles.center}>
        <Text>
          Failed to load movies!
        </Text>
      </View>
    )
  }

  render() {
    const { movies, loading, error } = this.state
    // Use the dataSource
    const rows = this.dataSource.cloneWithRows(movies || []);
    
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
      <View style={styles.cotainer}>
        <ListView
          dataSource={rows}
          renderRow={this.renderRow}

        />
      </View>
    )
  }
}

AppRegistry.registerComponent('Concertmap', () => Concertmap);
