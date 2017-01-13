import React, { Component } from 'react';
import { TouchableHighlight, Text, View, ActivityIndicator, Navigator } from 'react-native';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';

import ConcertMap from './ConcertMap';
import ConcertList from './ConcertList';
import ListDetail from './ListDetail';
import { styles } from '../styles/styles.js';

export default class Concerts extends Component {

  state = {
    loading: true,
    error: false,
    movies: [],
    filter: ['Heute', 'Abend', '15 km'],
    position: {},
    //lastPosition: 'unknown',
  };
  // watchID: ? number = null;

  componentDidMount() {
   // this.getPosition();
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
      this.setState({ error: true });
      return error;
    });
  }

  renderScene = (route, navigator, index) => {

    switch (route.index) {
      case 0:
        return <ConcertList
           concerts={this.state.movies}
           filter={this.state.filter}
           navigator={navigator}
          />;
      case 1:
        return <ConcertMap
          concerts={this.state.movies}
          filter={this.state.filter}
          region={this.state.position}
        />;
		  case 2:
        alert(JSON.stringify(route));
        return <ListDetail />;
		  default:
        return null;
    }
  };

   // source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
  render() {
    const { movies, loading, error } = this.state
		const routes = [
			{title: 'List', index: 0},
			{title: 'Map', index: 1},
			{title: 'ListDetail', index: 2},
		/*	{title: 'MapDetail', index: 3},*/
		];

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
					<Text>Failed to load Gigs!</Text>
				</View>
			)
    }

    return (
			 <Navigator
				  sceneStyle={{paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}}
				 	style={styles.tabBar}
					initialRoute={routes[0]}
				 	initialRouteStack={routes}
					renderScene={this.renderScene}
				  navigationBar={
					 <Navigator.NavigationBar
						routeMapper={{
							LeftButton: (route, navigator, index, navState) => {
								if (route.index === 0) {
									return <Text style={styles.tabTextActive}>Liste</Text>;
								} else {
									return (
										<TouchableHighlight onPress={() => navigator.jumpBack()}>
											<Text style={styles.tabText}>Liste</Text>
										</TouchableHighlight>
									);
								}
							},
							RightButton: (route, navigator, index, navState) => {
								if (route.index === 1) {
									return <Text style={styles.tabTextActive}>Karte</Text>;
								} else {
									return (
										<TouchableHighlight onPress={() => {
												if (route.index === 0) {
													navigator.push(routes[1]);
												} else {
													navigator.pop();
												}
											}}>
											<Text style={styles.tabText}>Karte</Text>
										</TouchableHighlight>);
								}
							},
							Title: (route, navigator, index, navState) => {
								return (<Text style={styles.dsplNone}>.</Text>);
							},
						}}
					/>
				}
      />
    )
  }
}
