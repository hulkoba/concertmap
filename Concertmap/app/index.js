import React, { Component } from 'react';
import { TouchableHighlight, Text, View, ActivityIndicator, Navigator } from 'react-native';
import moment from 'moment';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// overwrite native styles for showing the filter.
// see https://github.com/facebook/react-native/issues/10600
import * as navStyles from './config/LocalNavigationBarStylesAndroid';
import { styles } from './components/Concerts/styles';

import ConcertMap from './components/ConcertMap';
import ConcertList from './components/ConcertList';
import Detail from './components/Detail';
import FilterBar from './components/FilterBar';


export default class Concerts extends Component {

  static getWeekDays() {
    moment.locale('de', {
      weekdaysMin : "So_Mo_Di_Mo_Do_Fr_Sa".split("_"),
    });
    const filters = [];
    for(let i = 0; i <=6; i++) {
      filters.push(moment().add(i, 'days').format('dd DD'));
    }
    return filters;
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      concerts: [],
      filter: Concerts.getWeekDays(),
      position: 'unknown',
    };
  }

  componentDidMount() {
    this.getPosition();
    this.getMoviesFromApiAsync();
    if(this.state.position === 'unknown') {
      this.setState({
        position: {
          latitude: 52.5555,
          longitude: 13.3333,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }
      });
    }
  }

  getPosition = () => {
    navigator.geolocation.getCurrentPosition(
         (position) => {
            alert(JSON.stringify(position));
            this.setState({
              position: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.01,
              }
            });
            alert(JSON.stringify(this.state.position));
         },
         (error) => alert(JSON.stringify(error)),
         {enableHighAccuracy: false, timeout: 10000, maximumAge: 0}
      );
  }
  getMoviesFromApiAsync = () => {
    return fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => response.json())
    .then((responseJson) => {

     this.setState({
       loading: false,
       concerts: responseJson.movies
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
           concerts={this.state.concerts}
           filter={this.state.filter}
           navigator={navigator}
          />;
      case 1:
        return <ConcertMap
          concerts={this.state.concerts}
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
    const { loading, error, filter } = this.state
		const routes = [
			{ title: 'List', index: 0, key: 'list' },
			{ title: 'Map', index: 1, key: 'map' },
			{ title: 'Detail', index: 2, key: 'detail', data: {} },
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
				 	style={styles.tabBar}
          sceneStyle={{paddingTop: navStyles.General.TotalNavHeight}}
					initialRoute={routes[0]}
				// 	initialRouteStack={routes}
					renderScene={this.renderScene}
				  navigationBar={
					 <Navigator.NavigationBar
            navigationStyles={navStyles}
						routeMapper={{
							LeftButton: (route, navigator, index, navState) => {
                switch(route.index) {
                  case 0:
									 return (<Text style={styles.tabTextActive}>LISTE</Text>);
                  case 1:
                    return (<TouchableHighlight onPress={() => navigator.jumpBack()}>
                          <Text style={styles.tabText}>LISTE</Text>
                        </TouchableHighlight>);
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
								return (<FilterBar filter={this.state.filter} />);
							},
						}}
					/>
				}
      />
    )
  }
}
