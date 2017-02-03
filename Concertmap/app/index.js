import React, { Component } from 'react';
import { TouchableHighlight, Text, View, ActivityIndicator, Navigator } from 'react-native';

import moment from 'moment';
import deLocale from 'moment/locale/de';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

// overwrite native styles for showing the filter.
// see https://github.com/facebook/react-native/issues/10600
import * as navStyles from './config/LocalNavigationBarStylesAndroid';
import { styles } from './components/Concerts/styles';
import { settings } from './config/settings';
import { getDistance } from './utils/map-utils';

import ConcertMap from './components/ConcertMap';
import ConcertList from './components/ConcertList';
import Detail from './components/Detail';
import FilterBar from './components/FilterBar';
import ShareBtn from './components/ShareBtn';


export default class Concerts extends Component {

  static getWeekDays() {
    const filters = [];
    for(let i = 0; i <=6; i++) {
      filters.push(moment().add(i, 'days'));
    }
    return filters;
  }

  constructor(props) {
    super(props);
    moment.updateLocale('de', deLocale);

    this.state = {
      loading: true,
      error: false,
      concerts: [],
      activeFilter: moment(),
      initialRouteIndex: 0,
      navPressed: false,
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

  toggleNavPressed() {
    this.setState({ navPressed: !this.state.navPressed });
    alert(JSON.stringify(this.state.navPressed));
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
            latitudeDelta: 0.001,
            longitudeDelta: 0.01,
          }

          this.setState({ position: currentPosition });
          this.getConcertsFromAPI();
       },
       (error) => console.log(error),
       {enableHighAccuracy: false, timeout: 10000, maximumAge: 0}
    );
  }

  getArtistImage(id) {
    if(id) {
      return `http://images.sk-static.com/images/media/profile_images/artists/${id}/huge_avatar`
    }
  }

  buildConcerts(gigs) {
    return gigs.map((gig) => {
      const position = {
        lat: gig.venue.lat ? gig.venue.lat : gig.location.lat,
        lng: gig.venue.lng ? gig.venue.lng : gig.location.lng,
      };
      const distance = getDistance(this.state.position, position);
      const support = gig.performance.find((act) => act.billingIndex === 2);
      const subSupport = gig.performance.find((act) => act.billingIndex === 3);

      return {
        id: gig.id,
        title: gig.performance[0].displayName,
        venue: gig.venue.displayName,
        support: support ? support.displayName : null,
        subSupport: subSupport ? subSupport.displayName : null,
        city: gig.location.city.split(',')[0],
        position,
        time: gig.start.time ? gig.start.time.slice(0, -3) : '',
        datetime: gig.start.datetime ? moment(gig.start.datetime).calendar().split(' um')[0] :  moment(gig.start.date).calendar().split(' um')[0],
        image: this.getArtistImage(gig.performance[0].artist.id),
        url: gig.uri,
        distance: distance
      }

    /*  if(supports.length > 0) {
        alert(JSON.stringify(supports));
        concert.support = supports[0].displayName;
        // supports.length > 1 ? concert.subSupport = supports[1].displayName : null;
      }
*/
    });
  }

  getConcertsFromAPI = (filter) => {
    const searchDate = moment(filter).format('YYYY-MM-DD');

    return fetch(`${settings.SONGKICK_URL}&location=geo:${this.state.position.latitude},${this.state.position.longitude}&min_date=${searchDate}&max_date=${searchDate}`)
    .then((response) => response.json())
    .then((responseJson) => {
      const concerts = this.buildConcerts(responseJson.resultsPage.results.event);
      concerts.sort((a,b) => (a.distance - b.distance));

      this.setState({
       loading: false,
       concerts
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
                  concert={route.data} />;
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
			{ title: 'Detail', index: 2, key: 'detail-' + moment(), data: {} },
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
                          if(route.index === 1) {
                            navigator.jumpBack();
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
                     return (<ShareBtn concert={route.data}/>);
                  default:
                    break;
                }
							},
							Title: (route, navigator, index, navState) => {
								return ( route.index === 2 ? null :
                       <FilterBar
                          filter={Concerts.getWeekDays()}
                          activeFilter={activeFilter}
                          setFilter={this.setFilter.bind(this, route.index)}/>);
							},
						}}
					/>
				}
      />
    )
  }
}
