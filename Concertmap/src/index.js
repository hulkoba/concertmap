import React, { Component } from 'react';
import { TouchableHighlight, Text, View, ActivityIndicator, Navigator } from 'react-native';

import { StackNavigator, TabNavigator } from 'react-navigation';

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
import FilterBar from './components/FilterBar';


const AppNavigator = TabNavigator({
  Liste: { screen: ConcertList },
  Karte: { screen: ConcertMap },
  },
  {
  tabBarPosition: 'top',
  animationEnabled: true,
  initialRouteName: 'Liste',
  tabBarOptions: {
    style: styles.tabBar,
    labelStyle: styles.tabTextActive,
    inactiveTintColor: styles.tabText,
    indicatorStyle: styles.tabIndicator,
  }
});

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
      lastPostition: 'unknown',
      position: {
        latitude: 52.5243700,
        longitude: 13.4105300,
        latitudeDelta: 0.15,
        longitudeDelta: 0.18,
      },
    };

    // call navigate for AppNavigator here:
    this.navigator && this.navigator.dispatch({
      type: 'Navigate',
      routeName,
      params,
    });
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

  render() {
    const { loading, error, activeFilter } = this.state;

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

    return (
      <AppNavigator ref={nav => { this.navigator = nav; }}
        screenProps={{
          concerts: this.state.concerts,
          region: this.state.position,
          filter: this.state.activeFilter}}
        style={styles.container}/>
			/*

		 return (<Text style={styles.tabTextActive}>LISTE</Text>);

      <Text style={styles.tabText}>LISTE</Text>

      <FilterBar
        activeFilter={activeFilter}
        setFilter={this.setFilter.bind(this, route.index)}/>

      */
    )
  }
}
