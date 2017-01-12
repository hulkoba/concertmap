import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Navigator } from 'react-native';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';

import ConcertMap from './ConcertMap';
import ConcertList from './ConcertList';
import { styles } from '../styles/styles.js';

export default class Concerts extends Component {

  state = {
    index: 0,
    routes: [
      { key: '1', title: 'List' },
      { key: '2', title: 'Map' },
    ],
    loading: true,
    error: false,
    movies: [],
    filter: ['Heute', 'Abend', '15 km'],
    position: {},
    //lastPosition: 'unknown',
  };
  // watchID: ? number = null;

  componentDidMount() {
    this.getPosition();
    this.getMoviesFromApiAsync();
    this.setState({
      position: {
        latitude: 52.5451157,
        longitude: 13.355231799,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
    })
  }

  /*componentWillUnmount() {
    //navigator.geolocation.clearWatch(this.watchID);
  }*/

  // apply shouldComponentUpdate to prevent unnecessary re-renders.
  // is ivoked before rendering
  shouldComponentUpdate(nextProps, nextState) {
   return true;
  }

  getPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({position});
        alert(position.coords.lantitude, '\n', position.coords.longitude);
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

   /* this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });*/
  }
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
    return <TabBarTop {...props}
      indicatorStyle={styles.indicator}
      labelStyle={styles.tabBarText}
      style={styles.tabBarTop}/>;
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return <ConcertList concerts={this.state.movies}
                filter={this.state.filter} />;
    case '2':
      return <ConcertMap concerts={this.state.movies}
              filter={this.state.filter}
              region={this.state.position}/>;
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
     <TabViewAnimated
        style={[ styles.container, this.props.style ]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    )
  }
}
