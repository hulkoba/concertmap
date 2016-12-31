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

import { styles } from './styles/styles';

// Row comparison function
const rowHasChanged = (r1, r2) => r1.id !== r2.id;

// DataSource template object
const ds = new ListView.DataSource({rowHasChanged});

class Concertmap extends Component {

  constructor (props) {
    super(props);
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
  }

  state = {
    loading: true,
    error: false,
    titles: '',
    movies: [],
  };

  componentDidMount() {   
    this.getMoviesFromApiAsync();
    /*try {
      const response = await fetch('https://facebook.github.io/react-native/movies.json')
      
      const movies = await response.json()

      this.setState({movies: movies})

      const titles = movies.map(function(movie) {
        return movie.title;
      });

      this.setState({loading: false, titles})
    } catch (e) {
      this.setState({loading: false, error: true})
    }*/
  }


  getMoviesFromApiAsync = () => {
    return fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => response.json())
    .then((responseJson) => {
      
      const movies = responseJson.movies.map(function(movie) {
        return movie.title;
      });
      this.setState({ isLoading: false, titles: movies, movies: movies });
      console.log('#### ', movies);
      
      return movies;
    })
    .catch((error) => {
      console.error('error Message: ', error);
      return error;
    });
  }

  renderRow = (rowData) => {
    return (
      <Text style={styles.row}>
        {rowData.text}
      </Text>
    )
  }

  render() {
    const {titles, loading, error} = this.state
    // Use the dataSource
    const rows = this.dataSource.cloneWithRows(this.state.movies.list || []);
    
    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator animating={true} />
        </View>
      )
    }

    if (error) {
      return (
        <View style={styles.center}>
          <Text>
            Failed to load movies!
          </Text>
        </View>
      )
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
