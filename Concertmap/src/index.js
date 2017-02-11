import React, { Component } from 'react';
import { TouchableHighlight, Text, View, ActivityIndicator, Navigator } from 'react-native';

import moment from 'moment';
import deLocale from 'moment/locale/de';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

// overwrite native styles for showing the filter.
// see https://github.com/facebook/react-native/issues/10600
import * as navStyles from './config/LocalNavigationBarStylesAndroid';
import { styles } from './components/Concerts/styles';

import { SONGKICK_URL } from './config/constants';
import { sortByDistance, buildConcerts } from './utils/gig-utils';

import ConcertMap from './components/ConcertMap';
import ConcertList from './components/ConcertList';
import Detail from './components/Detail';
import FilterBar from './components/FilterBar';
import ShareBtn from './components/ShareBtn';


export default class Concerts extends Component {
  watchID : ? number = null;
  constructor(props) {
    super(props);
    moment.updateLocale('de', deLocale);

    this.state = {
      loading: true,
      error: false,
      concerts: [],
      activeFilter: moment(),
      initialRouteIndex: 0,
      lastPostition: 'unknown',
      position: {
        latitude: 52.5243700,
        longitude: 13.4105300,
        latitudeDelta: 0.15,
        longitudeDelta: 0.18,
      },
    };
  }

  componentDidMount() {
    this.getPosition();
    this.getConcertsFromAPI();
  }

  setFilter = (index, filter) => {
    this.setState({activeFilter: filter, initialRouteIndex: index});
    this.getConcertsFromAPI(filter);
  }

  getPosition = () => {
    navigator.geolocation.getCurrentPosition(
       (position) => {
          const currentPosition = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }

          this.setState({
            position: currentPosition,
            concerts: sortByDistance(this.state.concerts)
          });
       },
       (error) => console.log(error),
       {enableHighAccuracy: false, timeout: 20000, maximumAge: 0}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const lastPosition = position;
     // alert(JSON.stringify(lastPosition));
      this.setState({lastPosition});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  getConcertsFromAPI = (filter) => {
    const searchDate = moment(filter).format('YYYY-MM-DD');
    fetch(`${SONGKICK_URL}&location=geo:${this.state.position.latitude},${this.state.position.longitude}&min_date=${searchDate}&max_date=${searchDate}`)
    .then((response) => response.json())
    .then((responseJson) => {
      concerts = buildConcerts(responseJson.resultsPage.results.event, this.state.position);

      this.setState({
        loading: false,
        concerts: sortByDistance(concerts),
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
           navigator={navigator}
          />;
      case 1:
        return <ConcertMap
          concerts={this.state.concerts}
          region={this.state.position}
          navigator={navigator}
        />;
		  case 2:
        return <Detail
                  navigator={navigator}
                  region={this.state.position}
                  concert={route.passProps} />;
		  default:
        return null;
    }
  };

  render() {
    const { loading, error, activeFilter, initialRouteIndex } = this.state;

    // I am fond of cryptic keys (but seriously, keys should be unique)
		const routes = [
			{ title: 'List', index: 0, key: 'list-' + moment() },
			{ title: 'Map', index: 1, key: 'map-' + moment() },
			{ title: 'Detail', index: 2, key: 'detail-' + moment() },
		];

    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator animating={true} />
        </View>
      );
    }
    if (error) {
      return (
				<View style={styles.center}>
					<Text>Konnte keine Konzerte laden!</Text>
				</View>
			);
    }

    // https://github.com/facebook/react-native/issues/2048
    // Navigator bug: push twice
    return (
			 <Navigator
				 	style={styles.tabBar}
          sceneStyle={{paddingTop: navStyles.General.TotalNavHeight}}
					initialRoute={routes[initialRouteIndex]}
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
                    return (
                      <TouchableHighlight
                        onPress={() => {
                          if(!navState.routeStack.some((r) => (r.index === 0))) {
                            navigator.push(routes[0])
                          } else {
                            navigator.pop()
                          }
                        }}>
                        <Text style={styles.tabText}>LISTE</Text>
                      </TouchableHighlight>
                    );
                  case 2:
                    return (
                      <TouchableHighlight
                        onPress={() => navigator.pop()}>
                        <View style={styles.tabTextShare}>
                          <SimpleLineIcons name="arrow-left" style={styles.tabTextBack} />
                          <Text style={styles.tabTextBack}>ZURÜCK</Text>
                        </View>
                      </TouchableHighlight>
                    );
                  default:
                    break;
                }
							},
							RightButton: (route, navigator, index, navState) => {
                switch(route.index) {
                  case 0:
                    return (
                      <TouchableHighlight
                        onPress={() => {
                          if(!navState.routeStack.some((r) => r.index === 1)) {
                            navigator.push(routes[1])
                          } else {
                            navigator.jumpTo(routes[1])
                          }
                        }}>
                        <Text style={styles.tabText}>KARTE</Text>
                      </TouchableHighlight>);
                  case 1:
                    return (<Text style={styles.tabTextActive}>KARTE</Text>);
                  case 2:
                     return (<ShareBtn concert={route.passProps}/>);
                  default:
                    break;
                }
							},
							Title: (route, navigator, index, navState) => {
								return (
                  route.index === 2 ? null :
                    <FilterBar
                      activeFilter={activeFilter}
                      setFilter={this.setFilter.bind(this, route.index)}/>
                  );
							},
						}}
					/>
				}
      />
    )
  }
}
