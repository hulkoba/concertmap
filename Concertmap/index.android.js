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
  Image,
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

  // source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
  
  renderRow = (movies) => {
    return (
      <View style={listStyles.row}>
        <View style={listStyles.imageView}>
          <Image style={listStyles.image}
            source={require('./styles/pugtato.png')} />
        </View>

        <View style={listStyles.column}>
          <View style={listStyles.titleRow} numberOfLines={1}>
            <Text style={listStyles.title}>
              {movies.title}              
            </Text>
            <Text style={listStyles.distance}>
              {'900'}{'m'}
            </Text>        
          </View>
          
          
        
          <Text style={listStyles.subTitle} numberOfLines={1}>
            {movies.releaseYear}
          </Text>      
        
          <Text style={listStyles.description} numberOfLines={3}>
            {'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. '}
          </Text>
        </View>
       
      </View>
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
      <View style={styles.container}>
        <ListView
          dataSource={rows}
          renderRow={this.renderRow}

        />
      </View>
    )
  }
}

AppRegistry.registerComponent('Concertmap', () => Concertmap);
