import React, { Component } from 'react';
import { TouchableHighlight, Text, View, ActivityIndicator, Navigator } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ConcertMap from './components/ConcertMap';
import ConcertList from './components/ConcertList';
import Detail from './components/Detail';
import { styles } from './components/Concerts/styles';

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
        latitudeDelta: 0.001,
        longitudeDelta: 0.01
      },
    });
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
          navigator={navigator}
        />;
		  case 2:
        return <Detail
                  navigator={navigator}
                  concert={route.data} />;
		  default:
        return null;
    }
  };

  shareConcert = (data) => {
    alert(JSON.stringify(data));
  };

   // source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
  render() {
    const { movies, loading, error } = this.state
		const routes = [
			{ title: 'List', index: 0, key: 0 },
			{ title: 'Map', index: 1, key: 1 },
			{ title: 'Detail', index: 2, key: 2, data: {} },
		/*	{title: 'Filter', index: 3},*/
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
					<Text>Konnte keine Konzerte laden!</Text>
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
                switch(route.index) {
                  case 0:
									 return <Text style={styles.tabTextActive}>LISTE</Text>;
                  case 1:
                    return (
                      <TouchableHighlight onPress={() => navigator.jumpBack()}>
                        <Text style={styles.tabText}>LISTE</Text>
                      </TouchableHighlight>
                    );
                  case 2:
                    return (
                      <TouchableHighlight onPress={() => navigator.pop()}>
                        <View style={styles.tabTextShare}>
                          <SimpleLineIcons name="arrow-left" style={styles.tabTextBack} />
                          <Text style={styles.tabTextBack}>ZURÜCK</Text>
                        </View>
                      </TouchableHighlight>);

                  default:
                    break;
                }
							},
							RightButton: (route, navigator, index, navState) => {
                switch(route.index) {
                  case 0:
                    return (
                      <TouchableHighlight onPress={() => {
                          if (route.index === 0) {
                            navigator.push(routes[1]);
                          } else {
                            navigator.pop();
                          }
                        }}>
                        <Text style={styles.tabText}>KARTE</Text>
                      </TouchableHighlight>);
                  case 1:
                    return <Text style={styles.tabTextActive}>KARTE</Text>;
                  case 2:
                     return (
                      <TouchableHighlight onPress={() => this.shareConcert(route.data)}>
                        <View style={styles.tabTextShare} >
                          <MaterialIcons name="share" style={styles.icon} />
                          <Text style={styles.icon}>Teilen</Text>
                        </View>
                      </TouchableHighlight>);
                  default:
                    break;
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
