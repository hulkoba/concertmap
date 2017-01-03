import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ActivityIndicator,
  Navigaror,
} from 'react-native';

import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';

import { styles } from './styles/styles';
import ConcertList from './components/ConcertList';
import ConcertMap from './components/ConcertMap';
import ConcertBar from './components/ConcertBar';

class Concertmap extends Component {

  state = {
    index: 0,
    routes: [
      { key: '1', title: 'List' },
      { key: '2', title: 'Map' },
    ],
    loading: true,
    error: false,
    movies: [],
    position: 'unknown',
    lastPosition: 'unknown',
  };
  // watchID: ? number = null; 
  
  componentDidMount() {   
    /*navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({position});
        alert(position.coords.lantitude, '\n', position.coords.longitude);
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
*/
    this.getMoviesFromApiAsync();
  }

  /*componentWillUnmount() {
    //navigator.geolocation.clearWatch(this.watchID);
  }*/


  getMoviesFromApiAsync = () => {
    return fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => response.json())
    .then((responseJson) => {
      
     this.setState({
       loading: false,
       movies: responseJson.movies
      });      
    
     return responseJson;
    })
    .catch((error) => {
      alert('load movies failed \n',JSON.stringify(error));
      this.setState({ error: true }); 
      return error;
    });
  }


  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return <TabBarTop {...props} />;
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return <ConcertList tabLabel="List" concerts={this.state.movies} />;
    case '2':
      return <ConcertMap tabLabel="Map" concerts={this.state.movies} />;
    default:
      return null;
    }
  };

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
    const filter = ['heute', 'abend', '15km'];
       
    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator animating={true} />
        </View>
      )
    }
    if (error) {
     //this.renderError();
    }

    return ( 
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
      /*<ScrollableTabView
        tabBarBackgroundColor='#1a1a1a'
        tabBarActiveTextColor='#e6e6e6'
        tabBarInactiveTextColor='#7d7d7d'
        tabBarTextStyle={styles.tabBarText}
        tabBarUnderlineStyle={styles.tabBarUnderline}>         
       
        <ConcertList tabLabel="List" concerts={movies}  />
        <ConcertMap tabLabel="Map" concerts={movies}  />
      </ScrollableTabView>*/
    )
  }
}

AppRegistry.registerComponent('Concertmap', () => Concertmap);
