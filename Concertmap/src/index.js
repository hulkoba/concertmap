import React, { Component } from 'react';
import { TouchableHighlight, Text, View, ActivityIndicator } from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';

import moment from 'moment';
import deLocale from 'moment/locale/de';

import { SONGKICK_URL } from './config/constants';
import { sortByDistance, buildConcerts } from './utils/gig-utils';

import { styles } from './components/Concerts/styles';
import ConcertMap from './components/ConcertMap';
import ConcertList from './components/ConcertList';
import Detail from './components/Detail';
import FilterBar from './components/FilterBar';

/*<FilterBar
  activeFilter={state.activeFilter}
  setFilter={this.setFilter.bind(this)}/>*/


const AppNavigator = TabNavigator({
  Liste: { screen: ConcertList, params: {} },
  Karte: { screen: ConcertMap, params: {} },
  },
  {
  tabBarPosition: 'top',
  animationEnabled: true,
 // initialRouteName: 'Liste',
  tabBarOptions: {
    style: styles.tabBar,
    labelStyle: styles.tabTextActive,
    inactiveTintColor: styles.tabText,
    indicatorStyle: styles.tabIndicator,
  }
});

const ConcertApp = StackNavigator({
  Concerts: { screen: AppNavigator },
  Detail: { screen: Detail },
},
{
  headerMode: 'none'
});

export default class Concerts extends Component {

  componentWillMount() {
    // call navigate for AppNavigator here:
    this.navigator && this.navigator.dispatch({
      type: 'Navigate',
      routeName,
      params,
    });
  }

  constructor(props) {
    super(props);
    moment.updateLocale('de', deLocale);

    this.setFilter = this.setFilter.bind(this);

    this.state = {
      loading: true,
      error: false,
      concerts: [],
      activeFilter: moment(),
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

  setFilter = (filter) => {
    this.setState({activeFilter: filter});
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
  }

  getConcertsFromAPI = (filter) => {
    const searchDate = moment(filter).format('YYYY-MM-DD');
    let url = `${SONGKICK_URL}`;
    url += `&location=geo:${this.state.position.latitude},${this.state.position.longitude}`;
    url += `&min_date=${searchDate}&max_date=${searchDate}`;

    fetch(url)
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
    const { loading, error } = this.state;

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
      <ConcertApp ref={nav => { this.navigator = nav; }}
        screenProps={{
          concerts: this.state.concerts,
          region: this.state.position,
          filter: this.state.activeFilter,
          setFilter: this.setFilter}}
        style={styles.container}/>
    )
  }
}
